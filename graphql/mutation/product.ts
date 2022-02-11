import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation ($input: ProductInput) {
    createProduct(input: $input) {
      id
      name
      price
    }
  }
`;
