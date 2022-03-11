import { Category } from '../types/graphql';

export interface AppConfig {
  // category: Category | null;
  cartProducts: [ProductInCartType];
}

export interface ProductInCartType {
  _id: string;
  productId: string;
  pieces: number;
  totalPrice: number;
  attributes: Array<{
    attr: string;
    attrOpt: string;
  }>;
}

// export default AppConfig;
