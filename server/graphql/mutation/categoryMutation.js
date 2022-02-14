const {
  Category,
  AttributeOption,
  Attribute,
  Category_Attribute,
} = require('../../model');
const { fetchFakeServer } = require('../../utils/fetchFakeServer');

const categoryMutation = {
  createCategory: async ({ cat, catAttrIds }) => {
    const newCat = await new Category(cat).save();
    console.log(catAttrIds);
    const newCatAttrs = await Category_Attribute.insertMany(
      catAttrIds.map((attrId) => ({
        Category: newCat._id,
        Attribute: attrId,
      })),
    );
    return newCat;
  },

  deleteCategory: async ({ catId }) => {
    await Category_Attribute.deleteMany({
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
