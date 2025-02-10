import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils'

interface ILoaderData {
  content: string;
}

class Loader extends Component<ILoaderData> {
  protected _content: HTMLParagraphElement;

  constructor(container: HTMLElement) {
    super(container);
    this._content = ensureElement('.loader__text', container) as HTMLParagraphElement;
  }

  set content(value: string) {
    this.setText(this._content, value);
  }
}

export default Loader;