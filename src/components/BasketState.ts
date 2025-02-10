import { IBasketState } from '../types/models';
import { IEvents } from './base/events';
import { Model } from './base/Model';

class BasketState extends Model<IBasketState> {
  protected _basketItems: string[];

  constructor(event: IEvents) {
    super({}, event);
    this._basketItems = [];
  }

  addToBasket(itemId: string) {
    if (!this._basketItems.includes(itemId)) {
      this._basketItems.push(itemId);
    }
  }

  removeFromBasket(itemId: string) {
    this._basketItems = this._basketItems.filter(id => id !== itemId);
    this.emitChanges('basket.items:changed');
  }

  isInBasket(itemid: string) {
    return this._basketItems.includes(itemid);
  }

  clearBasket() {
    this._basketItems = [];
  }

  getBasketLength() {
    return this._basketItems.length;
  }
}

export default BasketState;