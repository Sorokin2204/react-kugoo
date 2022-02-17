const { attributeMutation } = require('./mutation/attributeMutation');
const { categoryMutation } = require('./mutation/categoryMutation');
const { specMutation } = require('./mutation/specMutation');

const rootMutation = {
  ...categoryMutation,
  ...attributeMutation,
  ...specMutation,
};
module.exports = { rootMutation };
