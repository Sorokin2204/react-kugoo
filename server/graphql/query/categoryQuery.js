const { Category, Category_Attribute } = require('../../model');

const categoryQuery = {
  getCategory: async ({ id, withAttrOpts }) => {
    const attributes = await Category_Attribute.find({ Category: id }).populate(
      {
        path: 'Attribute',
        ...(withAttrOpts && {
          populate: {
            path: 'AttributeOptions',
            model: 'AttributeOption',
          },
        }),
      },
    );
    const cat = await Category.findById(id);
    if (attributes.length !== 0) {
      const catConnect = {
        ...cat._doc,
        attributes: {
          edges: attributes.map((attr) => ({ node: attr.Attribute })),
        },
      };
      console.log(catConnect.attributes.edges[0]);
      return catConnect;
    } else {
      return cat;
    }
  },
  getAllCategory: async () => {
    return await Category.find();
  },
  getAllAttributeInCategory: async ({ categoryId }) => {
    const attributeIds = await Category_Attribute.find({
      categoryId: categoryId,
    }).select('_id');
    console.log(attributeIds);
    return;
  },
};
module.exports = { categoryQuery };
