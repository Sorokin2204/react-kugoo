const { AttributeOption, Attribute } = require('../../model');

const attributeMutation = {
  createAttributeWithOptions: async ({ attr, attrOpt }) => {
    try {
      let newAttr = new Attribute(attr);
      const newAttrOpt = new AttributeOption({
        ...attrOpt,
        Attribute: newAttr._id,
      });
      newAttr.AttributeOptions = [newAttrOpt._id];
      await newAttr.save();
      await newAttrOpt.save();
    } catch (error) {
      console.log('[ERR] Create Attribute', error.message);
    }
  },
  createAttributeOptionInAttribute: async ({ attrId, attrOpt }) => {
    try {
      const newAttrOpt = await new AttributeOption({
        ...attrOpt,
        Attribute: attrId,
      }).save();
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
