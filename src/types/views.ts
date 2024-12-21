import { IEvents } from '../components/base/events';

// Отображение
export interface IView {
  render(data?: object): HTMLElement;
}

// Конструктор
export interface IViewConstructor {
  new (container: HTMLElement, events?: IEvents): IView;
}
