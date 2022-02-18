const { AttributeOption, Attribute } = require('../../model');

const attributeMutation = {
  createAttributeWithOptions: async ({ attr, attrOpt }) => {
    try {
      const newAttrOpt = await new AttributeOption(attrOpt).save();
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
};
module.exports = { attributeMutation };
