import { IEvents } from '../base/events';
import { BaseView } from './BaseView';

class CartView extends BaseView {
  protected arrange: HTMLButtonElement;

  constructor (protected container: HTMLElement, protected events?: IEvents) {
    super(container);
    this.arrange = container.querySelector('.basket__button') as HTMLButtonElement;

    this.arrange.addEventListener('click', () => {
      this.events.emit('ui:basket-arrange');
    });
  }
}