import { IAppState, ICatalogItem, Categories } from '../types/models'
import { IEvents } from './base/events';
import { Model } from './base/Model';

export class CatalogItem extends Model<ICatalogItem> implements ICatalogItem {
  id: string;
  title: string;
  category: Categories;
  description: string;
  image: string;
  price: number;
}

export class AppState extends Model<IAppState> {
  protected _catalog: CatalogItem[];
  protected _basket: string[];
  protected _preview: string | null;
  protected _modal: boolean;

  constructor(event: IEvents) {
    super({}, event);
    this._catalog = [];
    this._basket = [];
    this._preview = null;
    this._modal = false;
  }

  set catalog(items: ICatalogItem[]) {
    this._catalog = items.map(item => new CatalogItem(item, this.events));
    this.emitChanges('catalog.items:changed', { catalog: this.catalog });
  }

  get catalog() {
    return this._catalog;
  }

  addToBasket(itemId: string) {
    if (!this._basket.includes(itemId)) {
      this._basket.push(itemId);
    }
  }

  isInBasket(itemid: string) {
    return this._basket.includes(itemid);
  }

  setPreview(item: ICatalogItem) {
    this._preview = item.id;
    this.emitChanges('preview:changed', item);
  }
}