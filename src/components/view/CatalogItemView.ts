import { IView } from '../../types/views';
import { IEvents } from '../base/events';

class CatalogItemView implements IView {
  protected category: HTMLSpanElement; 
  protected title: HTMLTitleElement;
  protected image: HTMLImageElement;
  protected price: HTMLSpanElement;

  protected id: string | null = null;

  constructor(protected container: HTMLElement, protected events?: IEvents) {
    // Инициализируем
    this.category = container.querySelector('.card__category') as HTMLSpanElement;
    this.title = container.querySelector('.card__title') as HTMLTitleElement;
    this.image = container.querySelector('.card__image') as HTMLImageElement;
    this.price = container.querySelector('.card__price') as HTMLSpanElement;
    
    container.addEventListener('click', () => {
      this.events.emit('ui:catalog-item-click');
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
    }

    return this.container;
  }

}