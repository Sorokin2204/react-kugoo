import { gql } from '@apollo/client';

export const GET_SPEC = gql`
  query getSpec($specId: String) {
    getSpec(specId: $specId) {
      _id
      name
      slug
      type
      SpecOptions {
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
