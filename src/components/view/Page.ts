import {Component} from "../base/Component";
import {IEvents} from "../base/events";
import {ensureElement} from "../../utils/utils";

interface IPage {
  catalog: HTMLElement[];
  locked: boolean;
}

export class Page extends Component<IPage> {
  _wrapper: HTMLElement;
  _catalog: HTMLElement;
  _basket: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    this._basket.addEventListener('click', () => {
      this.events.emit('ui:basket:open');
    });
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set locked(value: boolean) {
    if (value) {
      this.addClass(this._wrapper, 'page__wrapper_locked');
    } else {
      this.removeClass(this._wrapper, 'page__wrapper_locked');
    }
  }
}