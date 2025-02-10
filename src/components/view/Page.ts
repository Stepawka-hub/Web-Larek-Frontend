import {Component} from "../base/Component";
import {IEvents} from "../base/events";
import {ensureElement} from "../../utils/utils";

interface IPage {
  catalog: HTMLElement[];
  locked: boolean;
  counter: number;
}

export class Page extends Component<IPage> {
  _wrapper: HTMLElement;
  _catalog: HTMLElement;
  _loader: HTMLElement;
  _basket: HTMLElement;
  _basketCounter: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents, protected loaderElement?: HTMLElement) {
    super(container);

    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._catalog = ensureElement<HTMLElement>('.gallery');

    const catalogContainer = ensureElement<HTMLElement>('.gallery-container');
    this._loader = catalogContainer.insertBefore(loaderElement, catalogContainer.firstChild);

    this._basket = ensureElement<HTMLElement>('.header__basket');
    this._basketCounter = ensureElement<HTMLElement>('.header__basket-counter');

    this._basket.addEventListener('click', () => {
      this.events.emit('ui:basket:open');
    });
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set loader(value: boolean) {
    if (value) {
      this.addClass(this._loader, 'loader_active');
    } else {
      this.removeClass(this._loader, 'loader_active')
    }
  }

  set locked(value: boolean) {
    if (value) {
      this.addClass(this._wrapper, 'page__wrapper_locked');
    } else {
      this.removeClass(this._wrapper, 'page__wrapper_locked');
    }
  }

  set counter(count: number) {
    this.setText(this._basketCounter, count);
  }
}