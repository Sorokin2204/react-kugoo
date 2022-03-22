const {
  Category,
  AttributeOption,
  Attribute,
  Category_Attribute,
  Category_Spec,
} = require('../../model');
const { fetchFakeServer } = require('../../utils/fetchFakeServer');

const categoryMutation = {
  createCategory: async (parent, { cat, catAttrIds, catSpecIds }) => {
    const newCat = await new Category(cat).save();
    console.log(catSpecIds);
    const newCatAttrs = await Category_Attribute.insertMany(
      catAttrIds.map((attrId) => ({
        Category: newCat._id,
        Attribute: attrId,
      })),
    );
    const newCatSpecs = await Category_Spec.insertMany(
      catSpecIds.map((specId) => ({
        Category: newCat._id,
        Spec: specId,
      })),
    );
    return newCat;
  },

  deleteCategory: async (parent, { catId }) => {
    await Category_Attribute.deleteMany({
      Category: catId,
    });
    await Category_Spec.deleteMany({
      Category: catId,
    });
    await Category.findByIdAndDelete(catId);
    return;
  },

  updateCategory: async (
    parent,
    { updCategory, deleteIdSpecs, newIdSpecs, deleteIdAttrs, newIdAttrs },
  ) => {
    await Category.updateOne({ _id: updCategory._id }, updCategory);
    await Category_Attribute.insertMany(
      newIdAttrs.map((newAttr) => ({
        Category: updCategory._id,
        Attribute: newAttr,
      })),
    );
    await Category_Spec.insertMany(
      newIdSpecs.map((newSpec) => ({
        Category: updCategory._id,
        Spec: newSpec,
      })),
    );
    console.log('updCategory', updCategory);
    console.log('deleteIdOpts', deleteIdSpecs);
    console.log('newIdOpts', newIdSpecs);
    console.log('deleteIdOpts', deleteIdAttrs);
    console.log('newIdOpts', newIdAttrs);
  },
};
module.exports = { categoryMutation };
