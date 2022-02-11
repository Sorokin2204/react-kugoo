import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query getProduct($id: Int) {
    getProduct(id: $id) {
      id
      name
      price
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query {
    getAllProduct {
      id
      name
      price
    }
  }
`;
