import { FormErrors, IAppState, ICatalogItem, IContacts, IOrder } from '../types/models';
import { IEvents } from './base/events';
import { Model } from './base/Model';
import BasketState from './BasketState';
import CatalogItem from './CatalogItem';

class AppState extends Model<IAppState> {
	protected _catalog: CatalogItem[] = [];
	protected _basket: BasketState;
	protected _preview: string | null = null;
	protected _loadingCatalog: boolean = false;
	protected _order: IOrder = {
		paymentMethod: 'card',
		address: ''
	};
	protected _contacts: IContacts = {
		email: '',
		phone: ''
	};
	formErrors: FormErrors = {};

	constructor(event: IEvents, basketState: BasketState) {
		super({}, event);
		this._basket = basketState;
	}

	set preview(item: CatalogItem) {
		this._preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	set catalog(items: ICatalogItem[]) {
		this._catalog = items.map((item) => {
			if (!item.price) item.price = 1_000_000;
			return new CatalogItem(item, this.events);
		});
		this.emitChanges('catalog.items:changed', { catalog: this.catalog });
	}

	get catalog() {
		return this._catalog;
	}

	get bakset() {
		return this._basket;
	}

	set loadingCatalog(value: boolean) {
		this._loadingCatalog = value;
		value ? this.emitChanges('catalog.loader:show') : this.emitChanges('catalog.loader:hide');
	}

	getItemsFromBasket() {
		return this.catalog.filter((item) => this._basket.isInBasket(item.id));
	}

	getTotalPrice() {
		return this.getItemsFromBasket().reduce(
			(sum, current) => sum + current.price,
			0
		);
	}

	setOrderField(field: keyof IOrder, value: string) {
    this._order[field] = value;
		this.validateOrder();
  }

	setContactsField(field: keyof IContacts, value: string) {
    this._contacts[field] = value;
		this.validateContacts();
  }

	validateOrder() {
    const errors: typeof this.formErrors = {};

    if (!this._order.paymentMethod) {
      errors.paymentMethod = 'Необходимо указать способ оплаты!';
    }

    if (!this._order.address) {
      errors.address = 'Необходимо указать адрес доставки!';
    }

    this.formErrors = errors;
    this.events.emit('order:formErrors:change', this.formErrors);

    return Object.keys(errors).length === 0;
  }

	validateContacts() {
    const errors: typeof this.formErrors = {};

    if (!this._contacts.email) {
      errors.email = 'Необходимо указать email';
    }

    if (!this._contacts.phone) {
      errors.phone = 'Необходимо указать телефон';
    }

    this.formErrors = errors;
    this.events.emit('contacts:formErrors:change', this.formErrors);

    return Object.keys(errors).length === 0;
  }

	formOrder() {
		return {
			email: this._contacts.email,
			phone: this._contacts.phone,
			address: this._order.address,
			paymentMethod: this._order.paymentMethod,
			items: this.getItemsFromBasket(),
			totalPrice: this.getTotalPrice()
		}
	}
}

export default AppState;
