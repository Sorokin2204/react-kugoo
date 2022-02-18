import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
  query getCategory(
    $id: String
    $withAttrOpts: Boolean!
    $withSpecOpts: Boolean!
  ) {
    getCategory(
      id: $id
      withAttrOpts: $withAttrOpts
      withSpecOpts: $withSpecOpts
    ) {
      _id
      name
      slug
      attributes {
        edges {
          node {
            _id
            name
            slug
            AttributeOptions @include(if: $withAttrOpts) {
              _id
              label
              subLabel
              slug
              defaultPrice
            }
          }
        }
      }
      specs {
        edges {
          node {
            _id
            name
            slug
            type
            SpecOptions @include(if: $withSpecOpts) {
              _id
              name
              slug
            }
            SpecExtraTexts @include(if: $withSpecOpts) {
              _id
              name
              slug
              type
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORY = gql`
  query {
    getAllCategory {
      _id
      name
      slug
    }
  }
`;
