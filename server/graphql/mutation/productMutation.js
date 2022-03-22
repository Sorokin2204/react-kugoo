const { ObjectId } = require('mongodb');
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
const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);

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
const saveFile = async (img) => {
  const { createReadStream, filename } = await img.file;
  const stream = createReadStream();
  const pathName = path.join(
    appDir,
    '../public/static/products',
    `/${getValidFileName(img.name)}`,
  );
  await stream.pipe(fs.createWriteStream(pathName));
  return filename;
};

const deleteFile = async (filename) => {
  const pathFile = path.join(
    appDir,
    '../public/static/products',
    `/${filename}`,
  );
  try {
    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
    }
  } catch (err) {
    console.error(err);
  }
};
const deleteImages = async (product) => {
  let oldImages = await Product.findOne({
    _id: product._id,
  }).select('images');
  let deleteImages = oldImages.images.filter(
    (imgOld) =>
      product.images.findIndex(
        (imgNew) => imgNew._id === imgOld._id.toString(),
      ) == -1,
  );
  if (deleteImages.lenght !== 0) {
    for (deleteImg of deleteImages) {
      await deleteFile(deleteImg.name);
    }
  }
};

const addImages = async (product) => {
  let addedImages = product.images.filter((addedImg) => addedImg.file);
  if (addedImages.lenght !== 0) {
    for (addedImg of addedImages) {
      await saveFile(addedImg);
    }
  }
};

const saveImages = async (product) => {
  let images = product.images.map((img, index) => ({
    name: getValidFileName(img.name),
    order: index,
  }));
  await Product.updateOne({ _id: product._id }, { images: images });
};

const getValidFileName = (filename) =>
  filename.toLowerCase().replace(/\s+/g, '-').replace(/\-\-+/g, '-');

const updateImages = async (product) => {
  await deleteImages(product);
  await addImages(product);
  await saveImages(product);
};

const productMutation = {
  createProduct: async (parent, { product }) => {
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
  updateProduct: async (parent, { product }) => {
    // console.log(product);
    // let { attributes, specs, ...productRest } = product;
    // const { category, ...productRestNoCat } = productRest;
    // console.log({ ...productRestNoCat, Category: category });
    // updateSpecOptions(product);
    // updateAttributeOptions(product);
    await updateImages(product);
    // // console.log(product.specs.length);
    // // console.log(product.attributes.length);
    // await Product.updateOne(
    //   { _id: product._id },
    //   { ...productRestNoCat, Category: category },
    // );
    // console.log(productRest);
  },
};

module.exports = { productMutation };
