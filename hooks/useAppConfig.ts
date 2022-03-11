import { AppConfig } from './../graphql/AppConfigType';
import { useQuery } from '@apollo/client';
import appConfigVar from '../graphql/appConfig';
import { ProductInCartType } from '../graphql/AppConfigType';
import GET_APP_CONFIG from '../graphql/query/appConfig';
import saveAppConfig from '../graphql/saveAppConfig';
import _ from 'lodash';
import { createObjectId, mongoObjectId } from '../utils/createObjectId';
import { Category } from '../types/graphql';

export default function useAppConfig() {
  const { data } = useQuery(GET_APP_CONFIG);

  return {
    category: data.appConfig.category,
    cartProducts: data.appConfig.cartProducts,
    setCategory(category: Category) {
      appConfigVar({
        ...data.appConfig,
        category,
      });
      saveAppConfig();
    },
    deleteInCart(cartProductId: string | string[]) {
      let updCartProducts: ProductInCartType[];
      updCartProducts = data.appConfig.cartProducts.filter(
        (prod: ProductInCartType) =>
          Array.isArray(cartProductId)
            ? !cartProductId.includes(prod._id)
            : prod._id !== cartProductId,
      );
      appConfigVar({
        ...data.appConfig,
        cartProducts: updCartProducts,
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
