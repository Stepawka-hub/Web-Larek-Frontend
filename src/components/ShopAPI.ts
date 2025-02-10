import { Api } from './base/api'
import { ICatalogItem, IResponseProduct } from '../types/models'

interface IShopAPI {
  getCatalogItems: () => Promise<ICatalogItem[]>;
}

export class ShopAPI extends Api implements IShopAPI {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getCatalogItems(): Promise<ICatalogItem[]> {
    return this.get(`/product/`).then(
      (data: IResponseProduct) => data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image
      }))
    );
  }
}