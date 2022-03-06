import { gql } from '@apollo/client';

export const GET_PRODUCT_ADMIN = gql`
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

export const GET_PRODUCT = gql`
  query getProduct($productSlug: String) {
    getProduct(productSlug: $productSlug) {
      _id
      name
      slug
      price
      viewsCounter
      images {
        name
      }
      discountPrice
      vendorCode
      SpecOptions {
        edges {
          node {
            _id
            name
            Spec {
              _id
              name
            }
          }
        }
      }
      AttributeOptions {
        edges {
          node {
            _id
            label
            subLabel
            slug
            defaultPrice
            Attribute {
              _id
              name
              slug
            }
          }
          customPrice
          customSublabel
        }
      }
      Category {
        _id
        name
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_FORM_CART = gql`
  query getAllProductFromCart($productsFromCart: [ProductsFromCartInput]) {
    getAllProductFromCart(productsFromCart: $productsFromCart) {
      _id
      name
      slug
      price
      discountPrice
      images {
        name
      }
      AttributeOptions {
        edges {
          node {
            _id
            label
            slug
            defaultPrice
            Attribute {
              _id
              name
              slug
            }
          }
          customPrice
        }
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
export const GET_ALL_PRODUCTS_CARD = gql`
  query getAllProductCard($sort: String) {
    getAllProductCard(sort: $sort) {
      _id
      name
      slug
      price
      discountPrice
      images {
        name
      }
      SpecOptions {
        edges {
          node {
            _id
            name
          }
        }
      }
    }
  }
`;
