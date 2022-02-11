import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
  query getCategory($id: String) {
    getCategory(id: $id) {
      id
      name
      slug
    }
  }
`;

export const GET_ALL_CATEGORY = gql`
  query {
    getAllCategory {
      id
      name
      slug
    }
  }
`;
