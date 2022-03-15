const querySchema = `
  type Query {
### CATEGORY
    getCategory(id: String, withAttrOpts: Boolean!,withSpecOpts: Boolean!): Category
    getAllCategory: [Category]
    checkExistCategory(categorySlug: String): Boolean
### PRODUCT

searchProducts(searchText: String): [Product]
    getProduct(productSlug: String): Product
    getAllProductFromCart(productsFromCart: [ProductsFromCartInput]): [Product]
    getAllProductCard(category: String, filter: [String], sort: String, offset: Int, limit: Int): ProductPage
    getAllProduct: [Product]
### ATTRIBUTE
getDefaultProductAttributes(productId: String): [AttributeOption]
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
