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
  catalogItems: ICatalogItem;
}