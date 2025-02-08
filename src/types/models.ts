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
}

export interface IResponseProduct {
  count: number;
  items: ICatalogItem[];
}

export interface IAppState {
  catalogItems: ICatalogItem;
}












// // Модель данных каталога
// interface ICatalogModel {
//   items: IProduct[];
//   setItems(items: IProduct[]): void; // установить после загрузки из API
//   getProduct(id: string): IProduct | null; // Получить при рендере списков
// }

// // Модель данных корзины
// interface ICartModel {
//   items: Map<string, number>;
//   add(id: string): void;
//   remove(id: string): void;
//   clearCart(): void;
//   getList(): Map<string, number>;
// }

// // Модель данных покупателя
// interface IBuyerData {
//   email: string;
//   phone: string;
//   address: string;
//   paymentMethod: string;
//   selectPaymentMethod(method: string): void;
//   selectAddress(address: string): void;
//   provideContactInfo(email: string, phone: string): void;
//   clearData(): void;
// }

