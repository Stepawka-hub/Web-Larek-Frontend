import { IView } from '../../types/views';
import { IEvents } from '../base/events';

class ProductPreview implements IView {
  protected addToCardButton: HTMLButtonElement;

  protected category: HTMLSpanElement; 
  protected title: HTMLTitleElement;
  protected image: HTMLImageElement;
  protected price: HTMLSpanElement;
  protected text: HTMLParagraphElement;

  protected id: string | null = null;

  constructor (protected container: HTMLElement, protected events?: IEvents) {
    this.addToCardButton = container.querySelector('.card__button') as HTMLButtonElement;
    this.category = container.querySelector('.card__category') as HTMLSpanElement;
    this.title = container.querySelector('.card__title') as HTMLTitleElement;
    this.image = container.querySelector('.card__image') as HTMLImageElement;
    this.price = container.querySelector('.card__price') as HTMLSpanElement;
    this.text = container.querySelector('.card__text') as HTMLParagraphElement;

    this.addToCardButton.addEventListener('click', () => {
      this.events.emit('ui:product-preview');
    });
  }

  render(data: IProduct) {
    if (data) {
      // Если есть новые данные, то запомним их
      this.id = data.id;

      // Выведем в интерфейс
      this.title.textContent = data.name;
      this.category.textContent = data.category;
      this.image.src = data.image;
      this.image.alt = data.name;
      this.price.textContent = data.price + ' синапсов';
      this.text.textContent = data.description;
    }

    return this.container;
  }
}