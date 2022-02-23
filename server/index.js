const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const fetch = require('node-fetch');
var ObjectID = require('bson-objectid');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');
const mongoose = require('mongoose');
const { rootMutation } = require('./graphql/rootMutation');
const { rootQuery } = require('./graphql/rootQuery');
const { Category } = require('./model');
const { ApolloServer, gql } = require('apollo-server-express');
const { scrappingProduct } = require('./utils/scrapingProduct');

require('./model');

const jsonServer = (path) => `http://localhost:4000${path && path}`;
const dbString =
  'mongodb+srv://daniil:xK&AMb9E8CmzWM037F@cluster0.t9qys.mongodb.net/kugooStoreDb?retryWrites=true&w=majority';

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const root = {
  ...rootMutation,

  ...rootQuery,
};

async function start() {
  // const server = new ApolloServer({
  //   typeDefs: schema,
  //   resolvers: root,
  // });
  // await server.start();
  const app = express();
  app.use(cors(corsOptions));
  app.use(
    '/graphql',
    graphqlUploadExpress(),
    graphqlHTTP({
      graphiql: true,
      schema: schema,
      rootValue: root,
    }),
  );
  // server.applyMiddleware({ app });
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
