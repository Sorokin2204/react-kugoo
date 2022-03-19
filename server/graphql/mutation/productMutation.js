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
  Category,
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

const updateSpecOptions = async (product) => {
  const updSpecOpts = product.specs
    .filter((spec) => spec.specOptId)
    .map((specMap) => specMap.specOptId);
  await Product_SpecOption.deleteMany({
    SpecOption: { $nin: updSpecOpts },
    Product: product._id,
  });
  const updProductSpecOpts = updSpecOpts.map((updSpecOpt) => ({
    SpecOption: updSpecOpt,
    Product: product._id,
  }));
  for (updProductSpecOpt of updProductSpecOpts) {
    await Product_SpecOption.updateOne(updProductSpecOpt, updProductSpecOpt, {
      upsert: true,
    });
  }
};
const updateAttributeOptions = async (product) => {
  await Product_AttributeOption.deleteMany({
    AttributeOption: { $nin: product.attributes.map((attr) => attr._id) },
    Product: product._id,
  });
  const updProductAttributeOpts = product.attributes.map((updAttrOpt) => ({
    AttributeOption: updAttrOpt._id,
    Product: product._id,
    customPrice: updAttrOpt.customPrice,
    customSublabel: updAttrOpt.customSublabel,
  }));
  for (updProductAttributeOpt of updProductAttributeOpts) {
    await Product_AttributeOption.updateOne(
      {
        AttributeOption: updProductAttributeOpt.AttributeOption,
        Product: updProductAttributeOpt.Product,
      },
      updProductAttributeOpt,
      {
        upsert: true,
      },
    );
  }
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
  updateProduct: async ({ product }) => {
    let { attributes, specs, ...productRest } = product;
    const { category, ...productRestNoCat } = productRest;
    console.log({ ...productRestNoCat, Category: category });
    updateSpecOptions(product);
    updateAttributeOptions(product);
    // console.log(product.specs.length);
    // console.log(product.attributes.length);
    await Product.updateOne(
      { _id: product._id },
      { ...productRestNoCat, Category: category },
    );
    // console.log(productRest);
  },
};

module.exports = { productMutation };
