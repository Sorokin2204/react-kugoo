const { attributeQuery } = require('./query/attributeQuery');
const { categoryQuery } = require('./query/categoryQuery');

const rootQuery = {
  ...categoryQuery,
  ...attributeQuery,
};
module.exports = { rootQuery };
