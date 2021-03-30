import { gql } from 'apollo-server-express';
import levelSchema from './levelSchema.js';
import currentSchema from './currentSchema.js';
import connectionTypeSchema from './connectionTypeSchema.js';
import connectionsSchema from './connectionsSchema.js';
import stationSchema from './stationsSchema.js';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  levelSchema,
  currentSchema,
  connectionTypeSchema,
  connectionsSchema,
  stationSchema,
]