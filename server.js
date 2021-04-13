'use strict';

import 'dotenv/config.js';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import connectMongo from './db.js';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import { checkAuthentication } from './passport/authenticate.js';
import helmet from 'helmet';
import cors from 'cors';

(async () => {
  try {
    await connectMongo();

    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({ req, res }) => {
        try {
          const user = await checkAuthentication(req, res);
          return {
            req, res, user
          }
        } catch (error) {
          console.log(`Context error: ${error.message}`);
        }
      }
    });

    const app = express();

    app.use(cors());
    app.use(helmet({
      ieNoOpen: false,
      contentSecurityPolicy: false
    }));

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    if (process.env.NODE_ENV === 'production') {
      console.log('Prodd');
      const { default: production } = await import('./security/production.js');
      production(app, 3000);
    } else {
      const { default: localhost } = await import('./security/localhost.js');
      localhost(app, 8000, 3000);
    }

    server.applyMiddleware({ app, path: '/graphql' });
  } catch (error) {
    console.log(`Error while creating a server: ${error.message}`);
  }
})();