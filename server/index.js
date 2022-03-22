const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const fetch = require('node-fetch');
var ObjectID = require('bson-objectid');
const { TypeComposer, schemaComposer } = require('graphql-compose');
const { graphqlUploadExpress } = require('graphql-upload');
const GraphQLUpload = require('graphql-upload/public/GraphQLUpload.js');
const mongoose = require('mongoose');
const { rootMutation } = require('./graphql/rootMutation');
const { rootQuery } = require('./graphql/rootQuery');
const { Category } = require('./model');
const { ApolloServer, gql } = require('apollo-server-express');
const { scrappingProduct } = require('./utils/scrapingProduct');
const bodyParser = require('body-parser');
const {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
// schemaComposer.add(GraphQLUpload);
// schemaComposer.set('Upload', GraphQLUpload);
require('./model');

const jsonServer = (path) => `http://localhost:4000${path && path}`;
const dbString =
  'mongodb+srv://daniil:xK&AMb9E8CmzWM037F@cluster0.t9qys.mongodb.net/kugooStoreDb?retryWrites=true&w=majority';

const corsOptions = {
  origin: '*',
  credentials: true,
};

const root = {
  Upload: GraphQLUpload,
  Mutation: {
    ...rootMutation,
  },

  Query: {
    ...rootQuery,
  },
};

async function start() {
  const server = new ApolloServer({
    uploads: false,
    typeDefs: schema,
    resolvers: root,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
  });
  await server.start();
  const app = express();
  app.use(cors(corsOptions));
  app.use(graphqlUploadExpress({ maxFileSize: 10486000, maxFiles: 20 }));
  // app.use(
  //   '/graphql',
  //   bodyParser.json(),
  //   graphqlUploadExpress(),
  //   graphqlHTTP(async (request, response, graphQLParams) => {
  //     return {
  //       schema: schema,
  //       graphiql: true,
  //       rootValue: root,
  //       context: {
  //         req: request,
  //       },
  //     };
  //   }),
  // );
  server.applyMiddleware({ app });
  app.listen(5000, async () => {
    try {
      await mongoose.connect(dbString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      mongoose.connection.on('error', () => {
        console.log('Error Mongoose DB');
      });
      console.log('server started on port 5000');
    } catch (error) {
      console.log('[ERR] ', error);
    }
  });
}

start();
