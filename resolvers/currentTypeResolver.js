import CurrenType from '../models/currentTypeModel.js';

export default {
  Query: {
    currenttypes: () => CurrenType.find({})
  },
  Connections: {
    CurrentTypeID: (parent) => CurrenType.findById(parent.CurrentTypeID)
  }
}