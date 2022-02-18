const {
  Category,
  AttributeOption,
  Attribute,
  Category_Attribute,
  Category_Spec,
} = require('../../model');
const { fetchFakeServer } = require('../../utils/fetchFakeServer');

const categoryMutation = {
  createCategory: async ({ cat, catAttrIds, catSpecIds }) => {
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

  deleteCategory: async ({ catId }) => {
    await Category_Attribute.deleteMany({
      Category: catId,
    });
    await Category_Spec.deleteMany({
      Category: catId,
    });
    await Category.findByIdAndDelete(catId);
    return;
  },

  //   changeAttributeInCategory: async ({ categoryId, attributeIds }) => {
  //     const promisePosts = [];
  //     attributeIds.map((attrId) => {
  //       promisePosts.push(
  //         fetchFakeServer('/category-attribute', 'POST', { categoryId, attrId }),
  //       );
  //     });
  //     Promise.all(promisePosts).then((data) => {
  //       console.log('All posts completed');
  //       console.log(data);
  //       return false;
  //     });
  //   },
};
module.exports = { categoryMutation };
