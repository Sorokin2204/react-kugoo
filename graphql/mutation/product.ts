import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation ($product: ProductInput) {
    createProduct(product: $product)
  }
`;
