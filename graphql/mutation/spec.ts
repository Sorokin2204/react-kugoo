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
export const UPDATE_SPEC = gql`
  mutation updateSpec(
    $updSpec: SpecInput
    $newOpts: [SpecOptionInput]
    $updOpts: [SpecOptionInput]
    $deleteIdOpts: [String]
  ) {
    updateSpec(
      updSpec: $updSpec
      newOpts: $newOpts
      updOpts: $updOpts
      deleteIdOpts: $deleteIdOpts
    )
  }
`;
