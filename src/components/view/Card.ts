import { IEvents } from '../base/events';
import { Categories } from '../../types/models';
import { Component } from '../base/Component';
import { IView } from '../../types/views';

interface ICard {
  title: string;
  category: Categories;
  description?: string;
  image: string;
  price: number;
  isInBasket?: boolean;
}

export interface ICardAction {
  onClick: (event: MouseEvent) => void;
}

class Card extends Component<ICard> implements IView {
  protected _category: HTMLSpanElement; 
  protected _title: HTMLTitleElement;
  protected _image: HTMLImageElement;
  protected _price: HTMLSpanElement;

  constructor(protected container: HTMLElement, protected events?: IEvents, protected actions?: ICardAction) {
    super(container);
    
    // Инициализируем
    this._category = container.querySelector('.card__category') as HTMLSpanElement;
    this._title = container.querySelector('.card__title') as HTMLTitleElement;
    this._image = container.querySelector('.card__image') as HTMLImageElement;
    this._price = container.querySelector('.card__price') as HTMLSpanElement;

    if (actions) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set title(title: string) {
    this.setText(this._title, title);
  }

  set image(image: string) {
    this.setImage(this._image, image, this._title.textContent);
  }

  set price(price: number) {
    this.setText(this._price, price + ' синапсов');
  }

  set category(category: Categories) {
    this.setText(this._category, category);

    let className = '';

    switch(category) {
      case Categories.SOFT: {
        className = 'card__category_soft';
        break;
      }
      case Categories.HARD: {
        className = 'card__category_hard';
        break;
      }
      case Categories.OTHER: {
        className = 'card__category_other';
        break;
      }
      case Categories.BUTTON: {
        className = 'card__category_button';
        break;
      }
      case Categories.OPTIONAL: {
        className = 'card__category_additional';
        break;
      }
      default: return;
    }

    this.addClass(this._category, className);
  }
}

export default Card;