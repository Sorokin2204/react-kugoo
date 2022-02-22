import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query getProduct($productSlug: String) {
    getProduct(productSlug: $productSlug) {
      _id
      name
      slug
      price
      discountPrice
      vendorCode
      SpecOptions {
        edges {
          node {
            _id
            name
            default
            Spec {
              _id
            }
          }
          SpecExtraTexts {
            _id
            type
          }
        }
      }
      AttributeOptions {
        edges {
          node {
            _id
            label
            Attribute {
              _id
            }
          }
          customPrice
          customSublabel
        }
      }
      Category {
        _id
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query {
    getAllProduct {
      _id
      name
      slug
      price
      discountPrice
      vendorCode
    }
  }
`;
