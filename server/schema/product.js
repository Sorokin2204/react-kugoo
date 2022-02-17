const productImageFields = `
    path: String
    type: String
    name: String    
`;
const productFields = `
  name: String!
    price: Int!
    discountPrice: Int
    vendorCode: Int!
    viewsCounter: Int!
`;

const productSchema = `
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
`;
module.exports = productSchema;
