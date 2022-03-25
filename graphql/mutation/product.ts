import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation ($product: ProductInput) {
    createProduct(product: $product)
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation ($product: ProductInput) {
    updateProduct(product: $product)
  }
`;
export const DELETE_PRODUCT = gql`
  mutation ($productId: String) {
    deleteProduct(productId: $productId)
  }
`;
