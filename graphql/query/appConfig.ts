import { gql } from '@apollo/client';

const GET_APP_CONFIG = gql`
  query GetAppConfig {
    appConfig @client {
      cartProducts
      category
      adminHeaderTitle
    }
  }
`;

export default GET_APP_CONFIG;
