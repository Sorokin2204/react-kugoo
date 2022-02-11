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
// var SpecSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });
// const Spec = mongoose.model('Spec', SpecSchema);
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
// var SpecOptionSchema = new Schema({
//   slug: {
//     type: String,
//     required: true,
//   },
//   label: {
//     type: String,
//     required: true,
//   },
//   Spec: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Spec',
//   },
//   type: {
//     type: String,
//     enum: ['string', 'number'],
//     required: true,
//   },
// });
// const SpecOption = mongoose.model('SpecOption', SpecOptionSchema);
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
// var SpecExtraTextSchema = new Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     enum: ['after', 'before'],
//   },
//   Spec: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Spec',
//   },
//   Product_SpecOption: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: 'Product_SpecOption',
//   },
// });
// const SpecExtraText = mongoose.model('SpecExtraText', SpecExtraTextSchema);

module.exports = {
  //   Product,
  Category,
  Category_Attribute,
  Attribute,
  AttributeOption,
  //   Product_AttributeOption,
  //   Spec,
  //   SpecOption,
  //   SpecExtraText,
  //   Product_SpecOption,
};
