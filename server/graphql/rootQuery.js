const { attributeQuery } = require('./query/attributeQuery');
const { categoryQuery } = require('./query/categoryQuery');
const { specQuery } = require('./query/specQuery');
const { productQuery } = require('./query/productQuery');

const rootQuery = {
  ...categoryQuery,
  ...attributeQuery,
  ...specQuery,
  ...productQuery,
};
module.exports = { rootQuery };
