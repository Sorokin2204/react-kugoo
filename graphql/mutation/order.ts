import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation ($orderInfo: OrderInput, $productsInfo: [ProductsFromCartInput]) {
    createOrder(orderInfo: $orderInfo, productsInfo: $productsInfo)
  }
`;
