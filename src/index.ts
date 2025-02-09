import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';

import { AppState, CatalogItem } from './components/AppState';
import { ShopAPI } from './components/ShopAPI';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';

import { Page } from './components/view/Page';
import { ICatalogItem } from './types/models';

import Card from './components/view/Card';
import CardPreview from './components/view/CardPreview';
import Modal from './components/common/Modal';
import Basket from './components/view/Basket';
import BasketItem from './components/view/BasketItem';

// Шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const events = new EventEmitter();
const app = new AppState(events);
const api = new ShopAPI(CDN_URL, API_URL);

// Основные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement('#modal-container'), events);

// Переиспользуемые компоненты
const basket = new Basket(cloneTemplate(basketTemplate), events);

// Обработчики
events.on('catalog.items:changed', () => {
	page.counter = app.getBasketLength();

	page.catalog = app.catalog.map((item) => {
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

events.on('ui:card-selected', (item: CatalogItem) => {
	app.setPreview(item);
});

events.on('ui:modal:open', () => {
	page.locked = true;
});

events.on('ui:modal:close', () => {
	page.locked = false;
});

events.on('ui:basket:add', (item: CatalogItem) => {
	app.addToBasket(item.id);
	modal.close();
});

events.on('ui:basket:open', () => {
  const items = app.catalog.filter((item) => app.isInBasket(item.id));
  const basketItems = items.map((item, index) => {
    const basketItem = new BasketItem(cloneTemplate(cardBasketTemplate), events);
    return basketItem.render({
      title: item.title,
      price: item.price,
      index: index + 1
    });
  });

  const totalPrice = items.reduce((sum, current) => {
    return sum + current.price;
  }, 0)

	modal.render({
		content: basket.render({
      items: basketItems,
      totalPrice
    }),
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
			isInBasket: app.isInBasket(item.id),
		}),
	});
});

// Получение предметов
api.getCatalogItems().then((data: ICatalogItem[]) => {
	app.catalog = data;
});
