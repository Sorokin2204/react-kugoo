const querySchema = `
  type Query {
### CATEGORY
    getCategory(id: String, withAttrOpts: Boolean!,withSpecOpts: Boolean!): Category
    getAllCategory: [Category]
### PRODUCT
    getProduct(id: ID): Product
    getAllProduct: [Product]
### ATTRIBUTE
    getAttribute(attrId: String, attrOptId: String): Attribute
    getAllAttribute: [Attribute]
    getAllAttributeInCategory(categoryId: String): Category
    ### SPEC
    getAllSpec: [Spec]
    getSpec(specId: String): Spec
  }
`;
module.exports = { querySchema };
