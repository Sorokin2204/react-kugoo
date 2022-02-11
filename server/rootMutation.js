const { Category, AttributeOption, Attribute } = require('./model');
const { fetchFakeServer } = require('./utils/fetchFakeServer');

const rootMutation = {
  createCategory: async ({ input }) => {
    return await new Category(input).save();
  },
  createAttributeWithOptions: async ({ attr, attrOpt }) => {
    try {
      const newAttrOpt = await new AttributeOption(attrOpt).save();
      console.log(newAttrOpt);
      const newAttr = await new Attribute({
        ...attr,
        AttributeOptions: [newAttrOpt._id],
      }).save();
    } catch (error) {
      console.log(error.message);
    }
  },
  createAttributeOptionInAttribute: async ({ attrId, attrOpt }) => {
    try {
      const newAttrOpt = await new AttributeOption(attrOpt).save();
      const findAttr = await Attribute.updateOne(
        { _id: attrId },
        { $push: { AttributeOptions: newAttrOpt._id } },
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  updateAttributeOption: async ({ attrOptId, newAttrOpt }) => {
    try {
      const findAttr = await AttributeOption.updateOne(
        { _id: attrOptId },
        newAttrOpt,
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  createProduct: async ({ input }) => {
    return await fetchFakeServer('/product', 'POST', input);
  },

  changeAttributeInCategory: async ({ categoryId, attributeIds }) => {
    const promisePosts = [];
    attributeIds.map((attrId) => {
      promisePosts.push(
        fetchFakeServer('/category-attribute', 'POST', { categoryId, attrId }),
      );
    });
    Promise.all(promisePosts).then((data) => {
      console.log('All posts completed');
      console.log(data);
      return false;
    });
  },
};
module.exports = { rootMutation };
