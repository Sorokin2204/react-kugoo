const { ObjectId } = require('mongodb');
const {
  Attribute,
  AttributeOption,
  Product_AttributeOption,
} = require('../../model');

const attributeQuery = {
  getDefaultProductAttributes: async ({ productId }) => {
    const productAttrs = await Product_AttributeOption.find({
      Product: productId,
    }).select('AttributeOption  -_id');

    const defaultAttrs = await AttributeOption.aggregate([
      {
        $match: {
          _id: { $in: productAttrs.map((prod) => prod.AttributeOption) },
        },
      },
      // {
      //   $lookup: {
      //     from: Product_AttributeOption.collection.name,
      //     localField: '_id',
      //     foreignField: 'AttributeOption',
      //     as: 'AttributeOption',
      //     pipeline: [],
      //   },
      // },
      // { $unwind: '$AttributeOption' },
      {
        $group: {
          _id: '$Attribute',
          // defaultPrice: { $addToSet: '$defaultPrice' },
          // defaultPrice: '$defaultPrice',
          defaultAttrOpt: { $first: '$$ROOT' },
        },
      },
    ]);
    return defaultAttrs.map((attrOpt) => ({
      ...attrOpt.defaultAttrOpt,
      Attribute: { _id: attrOpt.defaultAttrOpt.Attribute },
    }));
  },
  getAllAttribute: async () => {
    try {
      const attrsOptions = await Attribute.aggregate([
        {
          $lookup: {
            from: AttributeOption.collection.name,
            localField: '_id',
            foreignField: 'Attribute',
            pipeline: [{ $match: { isDelete: { $ne: true } } }],
            as: 'AttributeOptions',
          },
        },
      ]);
      return attrsOptions;
    } catch (error) {
      console.log(error.message);
    }
  },
  getAttribute: async ({ attrId, attrOptId }) => {
    try {
      if (attrOptId) {
        return await Attribute.aggregate([
          {
            $match: {
              _id: ObjectId(attrId),
            },
          },
          {
            $lookup: {
              from: AttributeOption.collection.name,
              localField: '_id',
              foreignField: 'Attribute',
              pipeline: [],
              as: 'AttributeOptions',
            },
          },
        ]);
        // return await Attribute.findOne({
        //   _id: attrId,
        //   AttributeOptions: attrOptId,
        // }).populate('AttributeOptions');
      }
      if (attrId) {
        return await Attribute.findById(attrId);
      }
      throw new Error('Not valid attrId and attrOptId');
    } catch (error) {
      console.log(error.message);
    }
  },
};
module.exports = { attributeQuery };
