import { IView } from '../../types/views';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IBasketData {
  items: HTMLElement[],
  totalPrice: number
}

class Basket extends Component<IBasketData> implements IView {
  protected _totalPrice: HTMLSpanElement;
  protected _itemList: HTMLUListElement;
  protected _arrange: HTMLButtonElement;

  constructor (protected container: HTMLElement, protected events?: IEvents) {
    super(container);
  
    this._totalPrice = ensureElement('.basket__price', container);
    this._itemList = ensureElement<HTMLUListElement>('.basket__list', container);
    this._arrange = container.querySelector('.basket__button') as HTMLButtonElement;

    this._arrange.addEventListener('click', () => {
      this.events.emit('ui:basket:arrange');
    });
  }

  set items(items: HTMLElement[]) {
    if (!items.length) {
      this.setText(this._itemList, 'Корзина пуста');
      this.setDisabled(this._arrange, true);
    } else {
      this._itemList.replaceChildren(...items);
      this.setDisabled(this._arrange, false);
    }
  }

  set totalPrice(total: number) {
    this.setText(this._totalPrice, total + ' синапсов');
  }
}

export default Basket;