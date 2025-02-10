import { Categories, ICatalogItem } from '../types/models';
import { Model } from './base/Model';

class CatalogItem extends Model<ICatalogItem> implements ICatalogItem {
  id: string;
  title: string;
  category: Categories;
  description: string;
  image: string;
  price: number;
}

export default CatalogItem;