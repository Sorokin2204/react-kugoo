const {
  Category,
  Category_Attribute,
  Spec,
  SpecOption,
  SpecExtraText,
} = require('../../model');

const specQuery = {
  getAllSpec: async () => {
    return await Spec.find();
  },

  getSpec: async ({ specId }) => {
    const spec = await Spec.findById(specId).lean();
    const specOpts = await SpecOption.find({ Spec: specId }, { Spec: 0 });
    const specExtraTexts = await SpecExtraText.find(
      { Spec: specId },
      { Spec: 0 },
    );
    return {
      ...spec,
      SpecOptions: specOpts,
      SpecExtraTexts: specExtraTexts,
    };
  },
};
module.exports = { specQuery };
