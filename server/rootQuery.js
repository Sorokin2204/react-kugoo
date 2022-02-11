const {
  Category,
  Category_Attribute,
  Attribute,
  AttributeOption,
} = require('./model');
const { fetchFakeServer } = require('./utils/fetchFakeServer');

const rootQuery = {
  getProduct: async ({ id }) => {
    return await fetchFakeServer('/product', 'GET', `/${id}`);
  },
  getCategory: async ({ id }) => {
    return await Category.findById(id);
  },
  getAllCategory: async () => {
    return await Category.find();
  },
  getAllAttribute: async () => {
    try {
      const attrsOptions = await Attribute.find().populate('AttributeOptions');
      return attrsOptions;
    } catch (error) {
      console.log(error.message);
    }
  },

  getAttribute: async ({ attrId, attrOptId }) => {
    try {
      if (attrOptId) {
        return await Attribute.findOne({
          _id: attrId,
          AttributeOptions: attrOptId,
        }).populate('AttributeOptions');
      }
      if (attrId) {
        return await Attribute.findById(attrId);
      }
      throw new Error('Not valid attrId and attrOptId');
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllAttributeInCategory: async ({ categoryId }) => {
    const attributeIds = await Category_Attribute.find({
      categoryId: categoryId,
    }).select('_id');
    console.log(attributeIds);
    return;
  },
};
module.exports = { rootQuery };
