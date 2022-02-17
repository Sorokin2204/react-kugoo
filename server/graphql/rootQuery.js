const { attributeQuery } = require('./query/attributeQuery');
const { categoryQuery } = require('./query/categoryQuery');
const { specQuery } = require('./query/specQuery');

const rootQuery = {
  ...categoryQuery,
  ...attributeQuery,
  ...specQuery,
};
module.exports = { rootQuery };
