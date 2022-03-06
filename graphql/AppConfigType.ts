export interface AppConfig {
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
