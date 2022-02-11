import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation ($input: CategoryInput) {
    createCategory(input: $input) {
      name
      slug
    }
  }
`;
