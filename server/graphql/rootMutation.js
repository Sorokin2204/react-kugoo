const { attributeMutation } = require('./mutation/attributeMutation');
const { categoryMutation } = require('./mutation/categoryMutation');
const { productMutation } = require('./mutation/productMutation');
const { specMutation } = require('./mutation/specMutation');

const rootMutation = {
  ...categoryMutation,
  ...attributeMutation,
  ...specMutation,
  ...productMutation,
};
module.exports = { rootMutation };
