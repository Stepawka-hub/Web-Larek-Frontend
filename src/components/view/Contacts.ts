import { IContacts } from '../../types/models';
import { IEvents } from '../base/events';
import { Form } from '../common/Form';

export class Contacts extends Form<IContacts> {
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container, events);

    this._email = this.container.elements.namedItem('email') as HTMLInputElement;
    this._phone = this.container.elements.namedItem('phone') as HTMLInputElement;
  }

  set email(value: string) {
    this._email.value = value;
  }

  set phone(value: string) {
    this._phone.value = value;
  }
}