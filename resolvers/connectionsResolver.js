import Connections from '../models/connectionsModel.js';

export default {
  Station: {
    Connections: (parent) => parent.Connections.map(id => Connections.findById(id)),
  }
}