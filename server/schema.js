const { buildSchema } = require('graphql');

const productFields = `
  name: String!
    price: Int!
    discountPrice: Int
    vendorCode: Int!
    viewsCounter: Int!
`;

const categoryFields = `
    name: String!
    slug: String!
`;

const attributeFields = `
    name: String!
    slug: String!
    `;

const attributeOptionFields = `
    label: String!
    subLabel: String
    slug: String!
    defaultPrice: Int
    defaultChecked : Boolean!
    `;

const specFields = `
        name: String!
    
    `;
const specOptionFields = `
        value: String!
    label: String!
    beforeText: String
    afterText: String
    `;

const productImageFields = `
    path: String
    type: String
    name: String    
`;
const schema = buildSchema(`
  #### PRODUCT ####
  type ProductImage {
     ${productImageFields}
  }

  input ProductImageInput {
    ${productImageFields}
  }

  type Product {
    id: ID!
   ${productFields}
    images: [ProductImage]
    Category: Category!
    AttributeOptions: [AttributeOption!] #@relationship
  }

    input ProductInput {
    ${productFields}
    images: [ProductImageInput]
    Category: CategoryInput!
    AttributeOptions: [AttributeOptionInput!] #@relationship
}
#### CATEGORY ####
  type Category {
    _id: ID!
  ${categoryFields}
     Products: [Product] #@relationship
    attributes: Category_Attribute_Connection
  }

    input CategoryInput {
    ${categoryFields}
    parentCategory: CategoryInput
    Products: [ProductInput] #@relationship
  }

  type Category_Attribute_Connection {
    edges: [Category_Attribute_Edge]
  }

  type Category_Attribute_Edge {
      node: Attribute
  }

#### ATTRIBUTE ####
  type Attribute {
  _id: ID!
  ${attributeFields}
  AttributeOptions: [AttributeOption]
  }


  input AttributeInput {
   ${attributeFields}
  }

  type AttributeOption {
    _id: ID!
   ${attributeOptionFields}
    Attribute: Attribute
    Products: [Product]
  }

    input AttributeOptionInput {
    ${attributeOptionFields}
  }
#### SPEC ####
  type Spec {
    id: ID!
 ${specFields}
 SpecOptions: [SpecOption!]
  }

input SpecInput {
   ${specFields}
   SpecOptions: [SpecOptionInput!]
}

  type SpecOption {
    id: ID!
    ${specOptionFields}
    Spec: Spec!
  }

  input SpecOptionInput {
    ${specOptionFields}
    Spec: SpecInput!
}

type Product_SpecOption_Connection {
edges: [Product_SpecOption_Edge]
}
type Product_SpecOption_Edge {
node: SpecOption

}

  #### QUERIES ####
  type Query {
### CATEGORY
    getCategory(id: String, withAttrOpts: Boolean!): Category
    getAllCategory: [Category]
### PRODUCT
    getProduct(id: ID): Product
    getAllProduct: [Product]
### ATTRIBUTE
    getAttribute(attrId: String, attrOptId: String): Attribute
    getAllAttribute: [Attribute]
    getAllAttributeInCategory(categoryId: String): Category
  }
  #### MUTATIONS ####
  type Mutation {
#### CATEGORY
      deleteCategory(catId: String): String
      createCategory(cat: CategoryInput, catAttrIds: [String]): Category
      changeAttributeInCategory(categoryId: String, attributeIds: [String]): Boolean
### PRODUCT  
      createProduct(input: ProductInput): Product
### ATTRIBUTE
    createAttributeWithOptions(attr: AttributeInput, attrOpt: AttributeOptionInput ): String
### ATTRIBUTE_OPTION
    updateAttributeOption(attrOptId: String, newAttrOpt: AttributeOptionInput ): String
    createAttributeOptionInAttribute(attrId: String, attrOpt: AttributeOptionInput): String
### SPEC
      createSpec(input: SpecInput): Spec
  }
`);

module.exports = schema;
