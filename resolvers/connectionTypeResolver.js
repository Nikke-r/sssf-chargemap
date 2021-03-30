import ConnectionType from '../models/connectionTypeModel.js';

export default {
  Query: {
    connectiontypes: () => ConnectionType.find({})
  },
  Connections: {
    ConnectionTypeID: (parent) => ConnectionType.findById(parent.ConnectionTypeID)
  }
}