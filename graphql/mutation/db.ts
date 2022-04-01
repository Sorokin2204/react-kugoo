import { gql } from '@apollo/client';

export const RESET_DATABASE = gql`
  mutation {
    resetDatabase
  }
`;
