const querySchema = `
  type Query {
### CATEGORY
    getCategory(id: String, withAttrOpts: Boolean!,withSpecOpts: Boolean!): Category
    getAllCategory: [Category]
### PRODUCT
searchProducts(searchText: String): [Product]
    getProduct(productSlug: String): Product
    getAllProductFromCart(productsFromCart: [ProductsFromCartInput]): [Product]
    getAllProductCard(filter: [String], sort: String, offset: Int, limit: Int): ProductPage
    getAllProduct: [Product]
### ATTRIBUTE
    getAttribute(attrId: String, attrOptId: String): Attribute
    getAllAttribute: [Attribute]
    getAllAttributeInCategory(categoryId: String): Category
    ### SPEC
    getAllSpec: [Spec]
    getSpec(specId: String): Spec
   getAllSpecWithOptions: [Spec]
  }
`;
module.exports = { querySchema };
