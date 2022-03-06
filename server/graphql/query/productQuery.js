const { ObjectId } = require('mongodb');
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
  getAllProductFromCart: async ({ productsFromCart }) => {
    console.log(productsFromCart);
    const attrsFromCart = [];
    productsFromCart.map((prod) =>
      prod.attributes.map((attr) => attrsFromCart.push(ObjectId(attr.attrOpt))),
    );
    const productsInCart = await Product.aggregate([
      {
        $match: {
          _id: {
            $in: productsFromCart.map((prod) => ObjectId(prod.productId)),
          },
        },
      },
      {
        $lookup: {
          from: Product_AttributeOption.collection.name,
          localField: '_id',
          foreignField: 'Product',
          as: 'AttributeOptions',
          pipeline: [
            // {
            //   $match: {
            //     AttributeOption: {
            //       $in: attrsFromCart,
            //     },
            //   },
            // },
            {
              $lookup: {
                from: AttributeOption.collection.name,
                localField: 'AttributeOption',
                foreignField: '_id',
                as: 'AttributeOption',
                pipeline: [
                  {
                    $lookup: {
                      from: Attribute.collection.name,
                      localField: 'Attribute',
                      foreignField: '_id',
                      as: 'Attribute',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ]).catch((err) => console.log(err));

    const allProductDto = productsInCart.map((product) => ({
      ...product,
      AttributeOptions: {
        edges: product.AttributeOptions.map((attrOpt) => ({
          node: {
            ...attrOpt.AttributeOption[0],
            Attribute: attrOpt.AttributeOption[0].Attribute[0],
          },
          ...(attrOpt?.customPrice && { customPrice: attrOpt?.customPrice }),
          ...(attrOpt?.customSublabel && {
            customSublabel: attrOpt?.customSublabel,
          }),
        })),
      },
    }));
    console.log(allProductDto);
    return allProductDto;
  },
  getAllProductCard: async ({ sort }) => {
    let aggregateSort = {};
    switch (sort) {
      case 'popular':
        aggregateSort = { $sort: { viewCounter: 1 } };
        break;
      case 'high-price':
        aggregateSort = { $sort: { price: -1 } };
        break;
      case 'low-price':
        aggregateSort = { $sort: { price: 1 } };
        break;
      case 'name':
        aggregateSort = { $sort: { name: 1 } };
        break;

      default:
        break;
    }
    const specInCard = await Spec.find({
      orderInCard: { $exists: true },
    }).select('_id');
    specInCardIds = specInCard.map((spec) => spec._id);
    // console.log(specInCardIds);
    const allProduct = await Product.aggregate([
      {
        $lookup: {
          from: Product_SpecOption.collection.name,
          localField: '_id',
          foreignField: 'Product',
          as: 'SpecOptions',
          pipeline: [
            { $project: { Product: 0 } },

            {
              $lookup: {
                from: SpecOption.collection.name,
                localField: 'SpecOption',
                foreignField: '_id',
                as: 'SpecOption',
                pipeline: [],
              },
            },
            { $unwind: '$SpecOption' },
            { $unwind: '$SpecOption.Spec' },
            { $match: { 'SpecOption.Spec': { $in: specInCardIds } } },
          ],
        },
      },
      aggregateSort,
    ]);

    const allProductDto = allProduct.map((product) => ({
      ...product,
      Category: { _id: product.Category },
      SpecOptions: {
        edges: product.SpecOptions.map((specOpt) => ({
          node: {
            ...specOpt.SpecOption,
            Spec: { _id: specOpt.SpecOption.Spec },
          },
        })),
      },
    }));
    return allProductDto;
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
                pipeline: [
                  {
                    $lookup: {
                      from: Attribute.collection.name,
                      localField: 'Attribute',
                      foreignField: '_id',
                      as: 'Attribute',
                    },
                  },
                ],
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
                pipeline: [
                  {
                    $lookup: {
                      from: Spec.collection.name,
                      localField: 'Spec',
                      foreignField: '_id',
                      as: 'Spec',
                    },
                  },
                ],
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
            Spec: specOpt.SpecOption[0].Spec[0],
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
            Attribute: attrOpt.AttributeOption[0].Attribute[0],
          },
          ...(attrOpt?.customPrice && { customPrice: attrOpt?.customPrice }),
          ...(attrOpt?.customSublabel && {
            customSublabel: attrOpt?.customSublabel,
          }),
        })),
      },
    };
    return productData;
  },
};

module.exports = { productQuery };
