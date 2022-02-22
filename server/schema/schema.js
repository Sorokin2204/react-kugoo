const { buildSchema } = require('graphql');
const { attributeSchema } = require('./attribute');
const { categorySchema } = require('./category');
const { connectionsSchema } = require('./connections');
const { mutationSchema } = require('./mutation');
const productSchema = require('./product');
const { querySchema } = require('./query');
const { specSchema } = require('./spec');

const sch = `
#### CONNECTIONS-EDGES ####
${connectionsSchema}
#### PRODUCT ####
  ${productSchema}
#### CATEGORY ####
${categorySchema}
#### ATTRIBUTE ####
 ${attributeSchema}
#### SPEC ####
  ${specSchema}
  #### QUERIES ####
${querySchema}
  #### MUTATIONS ####
${mutationSchema}
`;
const schema = buildSchema(sch);

module.exports = schema;
