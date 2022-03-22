const {
  Spec,
  SpecOption,
  SpecExtraText,
  Product_SpecOption,
} = require('../../model');

const specMutation = {
  createSpec: async (
    parent,
    { spec, specOpts, specExtraAfter, specExtraBefore },
  ) => {
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
  deleteSpec: async (parent, { specId }) => {
    await Spec.deleteOne({ _id: specId });
    await SpecOption.deleteMany({ Spec: specId });
    await SpecExtraText.deleteMany({ Spec: specId });
    return;
  },
  updateSpec: async (parent, { newOpts, updOpts, deleteIdOpts, updSpec }) => {
    await Spec.updateOne({ _id: updSpec._id }, { ...updSpec });
    await SpecOption.insertMany(
      newOpts.map((newOpt) => ({ ...newOpt, Spec: updSpec._id })),
    );
    for (uptOpt of updOpts) {
      await SpecOption.updateOne({ _id: uptOpt._id }, uptOpt);
    }
    await Product_SpecOption.deleteMany({ SpecOption: deleteIdOpts });
    await SpecOption.deleteMany({ _id: deleteIdOpts });
  },
};
module.exports = { specMutation };
