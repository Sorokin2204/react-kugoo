var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ProductSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   oldPrice: {
//     type: Number,
//   },
//   vendorCode: {
//     type: String,
//     required: true,
//   },
//   images: [
//     {
//       path: {
//         type: String,
//         required: true,
//       },
//       type: {
//         type: String,
//         required: true,
//       },
//       name: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   ViewsCounter: {
//     type: Number,
//     required: true,
//   },
//   Category: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Category',
//   },
// });
// const Product = mongoose.model('Product', ProductSchema);
//////////////////////////// SPEC ////////////////////////////
var SpecSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['string', 'number'],
    required: true,
  },
});
const Spec = mongoose.model('Spec', SpecSchema);
//////////////////////////// SPEC_OPTION ////////////////////////////
var SpecOptionSchema = new Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  Spec: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Spec',
  },
});
const SpecOption = mongoose.model('SpecOption', SpecOptionSchema);
//////////////////////////// SPEC_EXTRA_TEXT ////////////////////////////
var SpecExtraTextSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['after', 'before'],
  },
  Spec: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Spec',
  },
});
const SpecExtraText = mongoose.model('SpecExtraText', SpecExtraTextSchema);
//////////////////////////// CATEGORY_SPEC ////////////////////////////
var Category_SpecSchema = new Schema({
  Category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  Spec: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Spec',
  },
});
const Category_Spec = mongoose.model('Category_Spec', Category_SpecSchema);

//////////////////////////// AttributeOption ////////////////////////////
var AttributeOptionSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  subLabel: {
    type: String,
  },
  defaultPrice: {
    type: Number,
    required: false,
  },
  defaultChecked: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const AttributeOption = mongoose.model(
  'AttributeOption',
  AttributeOptionSchema,
);
//////////////////////////// Attribute ////////////////////////////

var AttributeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  AttributeOptions: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AttributeOption',
    },
  ],
});
const Attribute = mongoose.model('Attribute', AttributeSchema);
//////////////////////////// CATEGORY_ATTRUBUTE ////////////////////////////
var Category_AttributeSchema = new Schema({
  Attribute: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Attribute',
  },
  Category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
});
const Category_Attribute = mongoose.model(
  'Category_Attribute',
  Category_AttributeSchema,
);
//////////////////////////// CATEGORY ////////////////////////////

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Category',
  },
});
const Category = mongoose.model('Category', CategorySchema);

// var Product_AttributeOptionSchema = new Schema({
//   Product: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Product',
//   },
//   AttributeOption: {
//     type: AttributeOption,
//     required: true,
//   },
//   customPrice: {
//     type: Number,
//   },
// });
// const Product_AttributeOption = mongoose.model(
//   'Product_AttributeOption',
//   Product_AttributeOptionSchema,
// );

// var Product_SpecOptionSchema = new Schema({
//   SpecOption: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'SpecOption',
//   },
//   Product: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Product',
//   },
// });

// const Product_SpecOption = mongoose.model(
//   'Product_SpecOption',
//   Product_SpecOptionSchema,
// );

module.exports = {
  //   Product,
  Category,
  Category_Attribute,
  Attribute,
  AttributeOption,
  //   Product_AttributeOption,
  Spec,
  SpecOption,
  SpecExtraText,
  //   Product_SpecOption,
};
