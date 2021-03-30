'use strict';

import 'dotenv/config.js';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import connectMongo from './db.js';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';

(async () => {
  try {
    await connectMongo();

    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers
    });

    const app = express();

    server.applyMiddleware({ app });

    app.listen({ port: 3000 }, () => console.log(`Server running at http://localhost:3000${server.graphqlPath}`))
  } catch (error) {
    console.log(`Error while creating a server: ${error.message}`);
  }
})();