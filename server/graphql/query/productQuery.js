const {
  Product,
  Product_SpecOption,
  SpecOption,
  ProductSpecOption_SpecExtraText,
  SpecExtraText,
  Product_AttributeOption,
  AttributeOption,
  Attribute,
  Category_Attribute,
  Category_Spec,
  Spec,
} = require('../../model');
const { showSpec } = require('../../scrapper/AddScrapedProduct');
const browserObject = require('../../scrapper/browser');
const scraperController = require('../../scrapper/pageController');

const productQuery = {
  getAllProduct: async () => {
    // await showSpec();
    //Start the browser and create a browser instance
    // let browserInstance = browserObject.startBrowser();

    // Pass the browser instance to the scraper controller
    // scraperController(browserInstance);
    return await Product.find();
  },
  getProduct: async ({ productSlug }) => {
    // const findProduct = await Product.findOne({ slug: productSlug });

    const findProduct = await Product.aggregate([
      {
        $match: {
          slug: productSlug,
        },
      },
      {
        $lookup: {
          from: Product_AttributeOption.collection.name,
          localField: '_id',
          foreignField: 'Product',
          as: 'AttributeOptions',
          pipeline: [
            {
              $lookup: {
                from: AttributeOption.collection.name,
                localField: 'AttributeOption',
                foreignField: '_id',
                as: 'AttributeOption',
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: Product_SpecOption.collection.name,
          localField: '_id',
          foreignField: 'Product',
          as: 'SpecOptions',
          pipeline: [
            { $project: { Product: 0, __v: 0 } },
            {
              $lookup: {
                from: SpecOption.collection.name,
                localField: 'SpecOption',
                foreignField: '_id',
                as: 'SpecOption',
              },
            },
            {
              $lookup: {
                from: ProductSpecOption_SpecExtraText.collection.name,
                localField: '_id',
                foreignField: 'Product_SpecOption',
                as: 'SpecExtraText',
                pipeline: [
                  {
                    $lookup: {
                      from: SpecExtraText.collection.name,
                      localField: 'SpecExtraText',
                      foreignField: '_id',
                      as: 'SpecExtraText',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ]);

    const productData = {
      ...findProduct[0],
      Category: { _id: findProduct[0].Category },
      SpecOptions: {
        edges: findProduct[0].SpecOptions.map((specOpt) => ({
          node: {
            ...specOpt.SpecOption[0],
            Spec: { _id: specOpt.SpecOption[0].Spec },
          },
          SpecExtraTexts: specOpt.SpecExtraText.map(
            (specExtra) => specExtra.SpecExtraText[0],
          ),
        })),
      },
      AttributeOptions: {
        edges: findProduct[0].AttributeOptions.map((attrOpt) => ({
          node: {
            ...attrOpt.AttributeOption[0],
            Attribute: { _id: attrOpt.AttributeOption[0].Attribute },
          },
          ...(attrOpt?.customPrice && { customPrice: attrOpt?.customPrice }),
          ...(attrOpt?.customSublabel && {
            customSublabel: attrOpt?.customSublabel,
          }),
        })),
      },
    };
    console.log(productData.AttributeOptions.edges);
    return productData;
  },
};

module.exports = { productQuery };
