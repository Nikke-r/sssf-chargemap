import LevelType from '../models/levelTypeModel.js';

export default {
  Query: {
    leveltypes: () => LevelType.find({})
  },
  Connections: {
    LevelID: (parent) => LevelType.findById(parent.LevelID)
  }
}