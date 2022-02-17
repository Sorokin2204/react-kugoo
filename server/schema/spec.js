const specFields = `
        name: String!
        slug: String!
          type: SpecOptionType
    `;

const specOptionFields = `
    name: String!
    slug: String!
   
    `;
const specExtraTextFields = `
      name: String!
      slug: String!
      type: SpecExtraTextType!
    `;

const specSchema = `

enum SpecOptionType {
    string
    number
}

enum SpecExtraTextType {
    after
before
}

type Spec {
    _id: ID!
 ${specFields}
 SpecOptions: [SpecOption]
 SpecExtraTexts: [SpecExtraText]
 Category: [Category] 
  }

type SpecOption {
    _id: ID!
    ${specOptionFields}  
    Spec: Spec!
    SpecExtraText: [SpecExtraText!] 
  }

type SpecExtraText {
    _id: ID!
  ${specExtraTextFields}
      SpecOption: [SpecOption]
  Spec: Spec!
}

input SpecInput {
   ${specFields}
}

input SpecOptionInput {
    ${specOptionFields}
}

input SpecExtraTextInput {
   ${specExtraTextFields}
}
`;

module.exports = { specSchema };
