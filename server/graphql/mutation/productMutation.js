const { Mongoose } = require('mongoose');
const {
  Spec,
  Product,
  Product_SpecOption,
  SpecExtraText,
  ProductSpecOption_SpecExtraText,
  SpecOption,
  AttributeOption,
  Product_AttributeOption,
} = require('../../model');

const createProductSpecs = (specs, productId) => {
  specs.map(async (spec) => {
    let specOptId = spec.specOptId;
    if (!specOptId) {
      const name =
        spec.type === 'number' ? parseInt(spec.customValue) : spec.customValue;
      const newSpecOption = await new SpecOption({
        name: name,
        slug: name,
        Spec: spec.specId,
      }).save();
      specOptId = newSpecOption._id;
    }
    const newProductSpec = await new Product_SpecOption({
      Product: productId,
      SpecOption: specOptId,
    }).save();
    if (spec.afterId) {
      const newProductSpecAfter = await new ProductSpecOption_SpecExtraText({
        Product_SpecOption: newProductSpec._id,
        SpecExtraText: spec.afterId,
      }).save();
    }
    if (spec.beforeId) {
      const newProductSpecBefore = await new ProductSpecOption_SpecExtraText({
        Product_SpecOption: newProductSpec._id,
        SpecExtraText: spec.beforeId,
      }).save();
    }
  });
};
const createProductAttributes = (attributes, productId) => {
  attributes.map(async (attr) => {
    await new Product_AttributeOption({
      AttributeOption: attr._id,
      Product: productId,
      ...(attr.customPrice && { customPrice: attr.customPrice }),
      ...(attr.customSublabel && { customSublabel: attr.customSublabel }),
    }).save();
  });
};

const productMutation = {
  createProduct: async ({ product }) => {
    try {
      const { attributes, specs, category, ...productData } = product;
      const newProduct = await new Product({
        ...productData,
        Category: category,
      }).save();
      console.log(specs);
      createProductSpecs(specs, newProduct._id);
      createProductAttributes(attributes, newProduct._id);

      //   Promise.all([...productSpecOperations, ...productAttrOperations]).then(
      //     () => {
      //       console.log('All specs and attrs added');
      //     },
      //   );
    } catch (error) {
      console.log(error);
    }

    // console.log(product);
  },
};

module.exports = { productMutation };
