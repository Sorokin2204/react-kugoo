import { gql } from '@apollo/client';

export const CREATE_ATTRIBUTE_WITH_OPTIONS = gql`
  mutation createAttributeWithOptions(
    $attr: AttributeInput
    $attrOpt: AttributeOptionInput
  ) {
    createAttributeWithOptions(attr: $attr, attrOpt: $attrOpt)
  }
`;

export const CREATE_ATTRIBUTE_OPTION_IN_ATTRIBUTE = gql`
  mutation createAttributeWithOptions(
    $attrId: String
    $attrOpt: AttributeOptionInput
  ) {
    createAttributeOptionInAttribute(attrId: $attrId, attrOpt: $attrOpt)
  }
`;

export const UPDATE_ATTRIBUTE_OPTION = gql`
  mutation updateAttributeOption(
    $attrOptId: String
    $newAttrOpt: AttributeOptionInput
  ) {
    updateAttributeOption(attrOptId: $attrOptId, newAttrOpt: $newAttrOpt)
  }
`;
