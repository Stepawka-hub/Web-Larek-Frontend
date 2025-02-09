import { IBasketItem } from '../../types/models';
import { IView } from '../../types/views';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export interface IBasketItemAction {
  onClick: (event: MouseEvent) => void;
}

class BasketItem extends Component<IBasketItem> implements IView {
  protected _title: HTMLSpanElement;
  protected _price: HTMLSpanElement;
  protected _index: HTMLSpanElement;
  protected _removeButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events?: IEvents) {
    super(container);

    // Инициализируем
    this._title = ensureElement('.card__title', container);
    this._price = ensureElement('.card__price', container);
    this._index = ensureElement('.basket__item-index', container);
    this._removeButton = container.querySelector('.basket__item-delete') as HTMLButtonElement;

    // Устанавливаем слушатель события
    // this._removeButton.addEventListener('click', () => {
    //   this.events.emit('ui:basket-remove', { id: this.id });
    // });
  }

  set title(title: string) {
    this.setText(this._title, title);
  }

  set price(price: number) {
    this.setText(this._price, price);
  }

  set index(index: number) {
    this.setText(this._index, index);
  }
}

export default BasketItem;