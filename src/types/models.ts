export enum Categories {
  SOFT = "софт-скил",
  HARD = "хард-скил",
  OTHER = "другое",
  BUTTON = "кнопка",
  OPTIONAL = "дополнительное"
}

// Модель данных продукта
export interface ICatalogItem {
  id: string;
  category: Categories;
  title: string;
  description?: string;
  image: string;
  price: number;
}

// Модель товара в корзине
export interface IBasketItem {
  title: string;
  price: number;
  index?: number;
}

export interface IResponseProduct {
  count: number;
  items: ICatalogItem[];
}

export interface IAppState {
  catalog: ICatalogItem[];
  basket: IBasketState;
  preview: string | null;
  modal: boolean;
  loadingCatalog: boolean;
}

export interface IBasketState {
  basketItems: string[];
}

// OrderForm
export interface IOrder {
  paymentMethod: string;
  address: string;
}

// ContactsForm
export interface IContacts {
  email: string;
  phone: string;
}

export type FormErrors = Partial<Record<keyof IOrder | keyof IContacts, string>>;