import { AppConfig } from './../graphql/AppConfigType';
import { useQuery } from '@apollo/client';
import appConfigVar from '../graphql/appConfig';
import { ProductInCartType } from '../graphql/AppConfigType';
import GET_APP_CONFIG from '../graphql/query/appConfig';
import saveAppConfig from '../graphql/saveAppConfig';
import _ from 'lodash';
import { createObjectId, mongoObjectId } from '../utils/createObjectId';

export default function useAppConfig() {
  const { data } = useQuery(GET_APP_CONFIG);

  return {
    cartProducts: data.appConfig.cartProducts,
    deleteInCart(cartProductId: string) {
      appConfigVar({
        ...data.appConfig,
        cartProducts: data.appConfig.cartProducts.filter(
          (prod: ProductInCartType) => prod._id !== cartProductId,
        ),
      });
      saveAppConfig();
    },
    updateInCart(updateProductInCart: ProductInCartType) {
      appConfigVar({
        ...data.appConfig,
        cartProducts: data.appConfig.cartProducts.map(
          (prod: ProductInCartType) =>
            prod._id === updateProductInCart._id ? updateProductInCart : prod,
        ),
      });
      saveAppConfig();
    },
    addingInCart(newProductInCart: ProductInCartType) {
      let updatedProductsInCart = [];
      let isRepeatInCart = false;
      if (data.appConfig.cartProducts.length !== 0) {
        updatedProductsInCart = data.appConfig.cartProducts.map(
          (prod: ProductInCartType) => {
            if (
              _.isEqual(
                _.omit(prod, ['pieces', '_id', 'totalPrice']),
                _.omit(newProductInCart, ['pieces', 'totalPrice']),
              )
            ) {
              isRepeatInCart = true;
              return {
                ...prod,
                pieces: prod.pieces + 1,
                totalPrice: newProductInCart.totalPrice,
              };
            } else {
              return prod;
            }
          },
        );
        if (!isRepeatInCart)
          updatedProductsInCart.push({
            _id: createObjectId(),
            ...newProductInCart,
          });
      } else {
        updatedProductsInCart.push({
          _id: createObjectId(),
          ...newProductInCart,
        });
      }

      appConfigVar({
        ...data.appConfig,
        cartProducts: updatedProductsInCart,
      });
      saveAppConfig();
    },
  };
}
