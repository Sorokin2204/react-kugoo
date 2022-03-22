import { Product_SpecOption_Connection } from './../../types/graphql';
import { gql } from '@apollo/client';

export const GET_ALL_ORDERS = gql`
  query {
    getAllOrders {
      _id
      name
      surname
      city
      phone
      total
      OrderProducts {
        totalPrice
      }
    }
  }
`;
export const GET_ORDER = gql`
  query ($orderId: String) {
    getOrder(orderId: $orderId) {
      _id
      city
      street
      buildingNumber
      buildingPart
      buildingFlat
      buildingIndex
      name
      surname
      phone
      email
      comment
      total
      OrderProducts {
        pieces
        totalPrice
        total
        Product {
          name
          slug
          price
          vendorCode
          images {
            order
            name
            _id
          }

          Category {
            slug
          }
        }

        AttributeOptions {
          label
        }
      }
    }
  }
`;
