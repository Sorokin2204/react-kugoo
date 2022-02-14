import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
  mutation ($cat: CategoryInput, $catAttrIds: [String]) {
    createCategory(cat: $cat, catAttrIds: $catAttrIds) {
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
