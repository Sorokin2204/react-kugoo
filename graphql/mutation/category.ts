import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation ($cat: CategoryInput, $catAttrIds: [String], $catSpecIds: [String]) {
    createCategory(
      cat: $cat
      catAttrIds: $catAttrIds
      catSpecIds: $catSpecIds
    ) {
      name
      slug
    }
  }
`;
export const DELETE_CATEGORY = gql`
  mutation ($catId: String) {
    deleteCategory(catId: $catId)
  }
`;
