import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
  query getCategory($id: String, $withAttrOpts: Boolean!) {
    getCategory(id: $id, withAttrOpts: $withAttrOpts) {
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
