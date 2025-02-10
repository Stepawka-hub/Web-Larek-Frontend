import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

interface ISuccessData {
  totalPrice: number
}

interface ISuccessAction {
  onClick: (event: MouseEvent) => void;
}

class Success extends Component<ISuccessData> {
  protected _description: HTMLParagraphElement;
  protected _closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected actions?: ISuccessAction) {
    super(container);

    this._description = ensureElement<HTMLParagraphElement>('.order-success__description', container);
    this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);

    if (actions) {
      this._closeButton.addEventListener('click', actions.onClick);
    }
  }

  set totalPrice(total: number) {
    this.setText(this._description, `Списано ${total} синапсов`)
  }
}

export default Success;