import { IOrder } from '../../types/models';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Form } from '../common/Form';

export class Order extends Form<IOrder> {
	protected _methodCard: HTMLButtonElement;
	protected _methodCash: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._methodCard = ensureElement<HTMLButtonElement>('button[name=card]', this.container);
		this._methodCash = ensureElement<HTMLButtonElement>('button[name=cash]', this.container);
		this._address = this.container.elements.namedItem('address') as HTMLInputElement;
    this.toggleMethod(this._methodCard);

		const onClick = (e: Event) => {
			const target = e.target as HTMLButtonElement;
      this.toggleMethod(target);

			const field = 'paymentMethod';
			const value = target.name;
			this.onInputChange(field, value);
		};

		// Присваиваем обработчик обоим элементам
		this._methodCard.addEventListener('click', onClick);
		this._methodCash.addEventListener('click', onClick);
	}

	set address(value: string) {
		this._address.value = value;
	}

  toggleMethod(activeButton: HTMLButtonElement) {
    this.removeClass(this._methodCard, 'button_alt-active');
    this.removeClass(this._methodCash, 'button_alt-active');
    
    this.addClass(activeButton, 'button_alt-active');
  }
}
