import { URLS } from '../constants';
import fetcher from './fetcher';

const getTokenPrice = () => {
  return fetcher.get(URLS.apisPrice);
};

export default getTokenPrice;
