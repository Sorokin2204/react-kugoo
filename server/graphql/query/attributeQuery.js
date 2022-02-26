const { ObjectId } = require('mongodb');
const { Attribute, AttributeOption } = require('../../model');

const attributeQuery = {
  getAllAttribute: async () => {
    try {
      const attrsOptions = await Attribute.aggregate([
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
