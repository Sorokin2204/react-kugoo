import { gql } from '@apollo/client';

export const CREATE_SPEC = gql`
  mutation createSpec(
    $spec: SpecInput
    $specOpts: [SpecOptionInput]
    $specExtraAfter: [SpecExtraTextInput]
    $specExtraBefore: [SpecExtraTextInput]
  ) {
    createSpec(
      spec: $spec
      specOpts: $specOpts
      specExtraAfter: $specExtraAfter
      specExtraBefore: $specExtraBefore
    )
  }
`;

export const DELETE_SPEC = gql`
  mutation deleteSpec($specId: String) {
    deleteSpec(specId: $specId)
  }
`;
