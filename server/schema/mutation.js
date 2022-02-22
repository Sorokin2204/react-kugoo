const mutationSchema = `
  type Mutation {
### CATEGORY
      deleteCategory(catId: String): String
      createCategory(cat: CategoryInput, catAttrIds: [String], catSpecIds: [String]): Category
      changeAttributeInCategory(categoryId: String, attributeIds: [String]): Boolean
### PRODUCT  
      createProduct(product: ProductInput): String
### ATTRIBUTE
    createAttributeWithOptions(attr: AttributeInput, attrOpt: AttributeOptionInput ): String
### ATTRIBUTE_OPTION
    updateAttributeOption(attrOptId: String, newAttrOpt: AttributeOptionInput ): String
    createAttributeOptionInAttribute(attrId: String, attrOpt: AttributeOptionInput): String
### SPEC
      createSpec(spec: SpecInput, specOpts: [SpecOptionInput], specExtraAfter: [SpecExtraTextInput], specExtraBefore: [SpecExtraTextInput]): String
      deleteSpec(specId: String): String
    }`;

module.exports = { mutationSchema };
