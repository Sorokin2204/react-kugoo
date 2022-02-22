const { Spec, SpecOption, SpecExtraText } = require('../../model');

const specMutation = {
  createSpec: async ({ spec, specOpts, specExtraAfter, specExtraBefore }) => {
    const newSpec = await new Spec(spec).save();
    if (SpecOption.length !== 0) {
      await SpecOption.insertMany(
        specOpts.map((specOpt) => ({
          ...specOpt,
          Spec: newSpec._id,
          default: true,
        })),
      );
    }

    if (specExtraAfter.length !== 0) {
      await SpecExtraText.insertMany(
        specExtraAfter.map((specAfter) => ({
          ...specAfter,
          Spec: newSpec._id,
        })),
      );
    }
    if (specExtraBefore.length !== 0) {
      await SpecExtraText.insertMany(
        specExtraBefore.map((specBefore) => ({
          ...specBefore,
          Spec: newSpec._id,
        })),
      );
    }

    // const newCat = await new Category(cat).save();
    // console.log(catAttrIds);

    // const newCatAttrs = await Category_Attribute.insertMany(
    //   catAttrIds.map((attrId) => ({
    //     Category: newCat._id,
    //     Attribute: attrId,
    //   })),
    // );
    // return newCat;
  },
  deleteSpec: async ({ specId }) => {
    await Spec.deleteOne({ _id: specId });
    await SpecOption.deleteMany({ Spec: specId });
    await SpecExtraText.deleteMany({ Spec: specId });
    return;
  },
};
module.exports = { specMutation };
