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

export const UPDATE_CATEGORY = gql`
  mutation updateCategory(
    $updCategory: CategoryInput
    $deleteIdSpecs: [String]
    $newIdSpecs: [String]
    $deleteIdAttrs: [String]
    $newIdAttrs: [String]
  ) {
    updateCategory(
      updCategory: $updCategory
      deleteIdSpecs: $deleteIdSpecs
      newIdSpecs: $newIdSpecs
      deleteIdAttrs: $deleteIdAttrs
      newIdAttrs: $newIdAttrs
    )
  }
`;
