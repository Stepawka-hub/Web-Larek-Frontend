import { IView } from '../../types/views';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IBasketData {
  
}

class Basket extends Component<IBasketData> implements IView {
  protected arrange: HTMLButtonElement;

  constructor (protected container: HTMLElement, protected events?: IEvents) {
    super(container);
    // this.arrange = container.querySelector('.basket__button') as HTMLButtonElement;

    // this.arrange.addEventListener('click', () => {
    //   this.events.emit('ui:basket-arrange');
    // });
  }
}

export default Basket;