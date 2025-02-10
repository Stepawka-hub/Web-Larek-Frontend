import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';

import AppState from './components/AppState';
import BasketState from './components/BasketState';
import CatalogItem from './components/CatalogItem';

import { ShopAPI } from './components/ShopAPI';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';

import { Page } from './components/view/Page';
import { ICatalogItem, IContacts, IOrder } from './types/models';

import Card from './components/view/Card';
import CardPreview from './components/view/CardPreview';
import Modal from './components/common/Modal';
import Basket from './components/view/Basket';
import BasketItem from './components/view/BasketItem';
import Success from './components/common/Success';
import Loader from './components/common/Loader';
import { Contacts } from './components/view/Contacts';
import { Order } from './components/view/Order';

// Шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const loaderTemplate = ensureElement<HTMLTemplateElement>('#loader');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const loader = new Loader(cloneTemplate(loaderTemplate)).render({content: 'Загрузка каталога'});

const events = new EventEmitter();
const basketState = new BasketState(events);
const appState = new AppState(events, basketState);
const api = new ShopAPI(CDN_URL, API_URL);

// Основные контейнеры
const page = new Page(document.body, events, loader);
const modal = new Modal(ensureElement('#modal-container'), events);

// Переиспользуемые компоненты
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

// Обработчики
events.on('catalog.items:changed', () => {
	page.counter = appState.bakset.getBasketLength();

	page.catalog = appState.catalog.map((item) => {
		const cardCatalog = new Card(cloneTemplate(cardCatalogTemplate), events, {
			onClick: () => events.emit('ui:card-selected', item),
		});

		return cardCatalog.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});
});

events.on('preview:changed', (item: CatalogItem) => {
	const cardPreview = new CardPreview(
		cloneTemplate(cardPreviewTemplate),
		events,
		{
			onClick: () => events.emit('ui:basket:add', item),
		}
	);

	modal.render({
		content: cardPreview.render({
			title: item.title,
			category: item.category,
			description: item.description,
			image: item.image,
			price: item.price,
			isInBasket: appState.bakset.isInBasket(item.id),
		}),
	});
});

events.on('ui:card-selected', (item: CatalogItem) => {
	appState.preview = item;
});

events.on('ui:modal:open', () => {
	page.locked = true;
});

events.on('ui:modal:close', () => {
	page.locked = false;
});

// Basket - обработчики
const renderBasket = () => {
	const items = appState.getItemsFromBasket();
	const basketItems = items.map((item, index) => {
		const basketItem = new BasketItem(
			cloneTemplate(cardBasketTemplate),
			events,
			{
				onClick: () => events.emit('ui:basket:remove', { id: item.id }),
			}
		);
		return basketItem.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});

	const totalPrice = appState.getTotalPrice();

	return basket.render({
		items: basketItems,
		totalPrice
	});
};

events.on('ui:basket:add', (item: CatalogItem) => {
	appState.bakset.addToBasket(item.id);
	page.counter = appState.bakset.getBasketLength();
	modal.close();
});

events.on('ui:basket:remove', (data: { id: string }) => {
	appState.bakset.removeFromBasket(data.id);
	page.counter = appState.bakset.getBasketLength();
});

events.on('basket.items:changed', () => {
	modal.render({
		content: renderBasket()
	});
});

events.on('ui:basket:open', () => {
	modal.render({
		content: renderBasket()
	});
});



events.on('ui:order:open', () => {
	appState.setOrderField('address', '');
  modal.render({ 
    content: order.render({
      address: '',
      valid: false,
      errors: []
    })
  });
});

events.on(/^ui:order\..*:change/, (data: { field: keyof IOrder, value: string }) => {
  appState.setOrderField(data.field, data.value);
});

events.on('order:formErrors:change', (errors: Partial<IOrder>) => {
  const { address, paymentMethod } = errors;
  order.valid = !address && !paymentMethod;
  order.errors = Object.values({address, paymentMethod}).filter(item => !!item).join('; ');
});

events.on('ui:order:submit', () => {
	events.emit('ui:contacts:open');
});



events.on('ui:contacts:open', () => {
  modal.render({ 
    content: contacts.render({
      email: '',
      phone: '',
      valid: false,
      errors: []
    })
  });
});

events.on(/^ui:contacts\..*:change/, (data: { field: keyof IContacts, value: string }) => {
  appState.setContactsField(data.field, data.value);
});

events.on('contacts:formErrors:change', (errors: Partial<IContacts>) => {
  const { email, phone } = errors;
  contacts.valid = !email && !phone;
  contacts.errors = Object.values({phone, email}).filter(item => !!item).join('; ');
});

events.on('ui:contacts:submit', () => {
	// Убрать
	alert(`Заказ: \n${JSON.stringify(appState.formOrder())}`);

	const successModal = new Success(cloneTemplate(successTemplate), {
		onClick: () => modal.close()
	});

	modal.render({
		content: successModal.render({
			totalPrice: appState.getTotalPrice()
		})
	});

	appState.bakset.clearBasket();
	page.counter = appState.bakset.getBasketLength();
});



// Loader
events.on('catalog.loader:show', () => {
	page.loader = true;
});

events.on('catalog.loader:hide', () => {
	page.loader = false;
});

// Получение предметов
const getCatalogItems = () => {
	appState.loadingCatalog = true;
	api.getCatalogItems().then((data: ICatalogItem[]) => {
		appState.catalog = data;
		appState.loadingCatalog = false;
	});
}

getCatalogItems();


