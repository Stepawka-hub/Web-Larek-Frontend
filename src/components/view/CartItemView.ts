import { IView } from '../../types/views';
import { IEvents } from '../base/events';

class CartItemView implements IView {
  protected title: HTMLSpanElement;
  protected price: HTMLSpanElement;
  protected removeButton: HTMLButtonElement;

  protected id: string | null = null;

  constructor(protected container: HTMLElement, protected events?: IEvents) {
    // Инициализируем
    this.title = container.querySelector('.card__title') as HTMLSpanElement;
    this.price = container.querySelector('.card__price') as HTMLSpanElement;
    this.removeButton = container.querySelector('.basket__item-delete') as HTMLButtonElement;

    // Устанавливаем слушатель события
    this.removeButton.addEventListener('click', () => {
      this.events.emit('ui:basket-remove', { id: this.id });
    });
  }

  render(data: { id: string, title: string, price: number }) {
    if (data) {
      // Если есть новые данные, то запомним их
      this.id = data.id;

      // Выведем в интерфейс
      this.title.textContent = data.title;
      this.price.textContent = data.price + ' синапсов';
    }

    return this.container;
  }

}