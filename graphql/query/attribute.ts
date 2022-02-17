import { gql } from '@apollo/client';

export const GET_ATTRIBUTE = gql`
  query getAttribute($attrId: String, $attrOptId: String) {
    getAttribute(attrId: $attrId, attrOptId: $attrOptId) {
      _id
      name
      slug
      AttributeOptions {
        _id
        label
        subLabel
        slug
        defaultPrice
        defaultChecked
      }
    }
  }
`;

export const GET_ALL_ATTRIBUTE = gql`
  query {
    getAllAttribute {
      _id
      name
      slug
      AttributeOptions {
        _id
        label
        subLabel
        slug
        defaultPrice
        defaultChecked
      }
    }
  }
`;