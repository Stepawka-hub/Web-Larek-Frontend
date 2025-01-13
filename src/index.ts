import './scss/styles.scss';
import {API_URL, CDN_URL} from "./utils/constants";

import { AppData } from './components/AppData'
import { ShopAPI } from './components/ShopAPI';

const app = new AppData();
const api = new ShopAPI(CDN_URL, API_URL);

api.getCatalogItems()
.then((data) => {
  console.log(JSON.stringify(data));
});