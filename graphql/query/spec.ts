import { gql } from '@apollo/client';

export const GET_SPEC = gql`
  query getSpec($specId: String) {
    getSpec(specId: $specId) {
      _id
      name
      slug
      type
      SpecOptions {
        _id
        name
        slug
      }
      SpecExtraTexts {
        name
        slug
        type
      }
    }
  }
`;

export const GET_ALL_SPEC = gql`
  query {
    getAllSpec {
      _id
      name
      slug
    }
  }
`;
export const GET_ALL_SPEC_WITH_OPTIONS = gql`
  query ($categorySlug: String) {
    getAllSpecWithOptions(categorySlug: $categorySlug) {
      _id
      name
      slug
      SpecOptions {
        _id
        name
        slug
      }
    }
  }
`;
