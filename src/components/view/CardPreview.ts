import { IView } from '../../types/views';
import { IEvents } from '../base/events';

import Card from './Card';
import { ensureElement } from '../../utils/utils';

interface ICardPreviewAction {
  onClick: (event: MouseEvent) => void;
}

class CardPreview extends Card implements IView {
  protected _description: HTMLParagraphElement;
  protected _addToCardButton: HTMLButtonElement;

  constructor (protected container: HTMLElement, protected events?: IEvents, protected actions?: ICardPreviewAction) {
    super(container, events);

    this._description = ensureElement<HTMLParagraphElement>('.card__text');
    this._addToCardButton = container.querySelector('.card__button') as HTMLButtonElement;

    if (actions) {
      this._addToCardButton.addEventListener('click', actions.onClick);
    }
  }

  set isInBasket(value: boolean) {
    this.setDisabled(this._addToCardButton, value);

    if (value) {
      this.setText(this._addToCardButton, 'Добавлено в корзину');
    } else {
      this.setText(this._addToCardButton, 'В корзину');
    }
  }
}

export default CardPreview;