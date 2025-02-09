import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils'

interface ILoaderData {
  content: string;
}

export class Loader extends Component<ILoaderData> {
  protected _content: HTMLParagraphElement;

  constructor(container: HTMLElement) {
    super(container);

    this._content = ensureElement('.loader__text', container) as HTMLParagraphElement;
  }

  set content(value: string) {
    this.setText(this._content, value);
  }

  open() {
    this.container.classList.add('loader_active');
  }

  close() {
    this.container.classList.remove('loader_active');
    this.content = null;
  }

  render(data: ILoaderData): HTMLElement {
    this.content = data?.content;
    this.open();
    return this.container;
  }
}