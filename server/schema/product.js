const productImageFields = `
    path: String
    type: String
    name: String    
`;
const productFields = `
  name: String!
  slug: String!
    price: Int!
    discountPrice: Int
    vendorCode: String!

`;

const productSchema = `
 type ProductImage {
     ${productImageFields}
  }

  type Product {
    _id: ID!
   ${productFields}
    viewsCounter: Int
    images: [ProductImage]
    Category: Category
    SpecOptions: Product_SpecOption_Connection
    AttributeOptions: Product_AttributeOption_Connection
  }


  input ProductImageInput {
    ${productImageFields}
  }

    input ProductInput {
    ${productFields}
    category: String!
    images: [ProductImageInput]
    attributes:[ProductAttributesDtoInput]
    specs: [ProductSpecDtoInput]
}
input ProductAttributesDtoInput {
  _id: String!
  customPrice: Int
  customSublabel: String
}
input ProductSpecDtoInput {
  specId: String!
  specOptId: String
  type: String
  customValue: String
  afterId: String
  beforeId: String
}



`;
module.exports = productSchema;
