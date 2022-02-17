const categoryFields = `
    name: String!
    slug: String!
`;
const categorySchema = `
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

`;

module.exports = { categorySchema };
