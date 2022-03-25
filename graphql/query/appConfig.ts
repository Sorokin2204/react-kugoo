import { gql } from '@apollo/client';

const GET_APP_CONFIG = gql`
  query GetAppConfig {
    appConfig @client {
      editedOption
      cartProducts
      category
      adminHeaderTitle
    }
  }
`;

export default GET_APP_CONFIG;
