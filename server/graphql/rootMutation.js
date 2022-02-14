const { attributeMutation } = require('./mutation/attributeMutation');
const { categoryMutation } = require('./mutation/categoryMutation');

const rootMutation = {
  ...categoryMutation,
  ...attributeMutation,
};
module.exports = { rootMutation };
