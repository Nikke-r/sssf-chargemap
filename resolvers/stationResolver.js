import { UserInputError } from 'apollo-server-errors';
import Station from '../models/stationsModel.js';
import Connection from '../models/connectionsModel.js';
import { rectangelBounds } from '../utils/helper.js';

export default {
  Query: {
    station: (_, args) => Station.findById(args.id),
    stations: async (_, args) => {
      try {
        const { start, limit, bounds } = args;
        let response;
  
        if (bounds) {
          const rb = rectangelBounds(bounds._northEast, bounds._southWest);
  
          response = await Station.find({}).skip(start).limit(limit).where('Location').within(rb);
        } else {
          response = await Station.find({}).skip(start).limit(limit);
        }
  
        return response;
      } catch (error) {
        console.log(`Error while getting the stations: ${error.message}`);
        throw new UserInputError(`Error while getting the stations: ${error.message}`);
      }
    }
  },
  Mutation: {
    addStation: async (_, args) => {
      try {
        const { Connections, ...rest } = args;

        const newConnections = await Promise.all(Connections.map(async conn => {
          try {
            const newConn = new Connection(conn);
            await newConn.save();
            return newConn._id;
          } catch (error) {
            throw new UserInputError(`Error while creating the connections: ${error.message}`);
          }
        }));

        const newStation = new Station({
          ...rest,
          Connections: newConnections
        });

        return newStation.save();
      } catch (error) {
        throw new UserInputError(`Error while adding a new station: ${error.message}`);
      }
    },
    modifyStation: async (_, args) => {
      try {
        const { id, Connections, ...rest } = args;

        let updatedStation = await Station.findByIdAndUpdate(id, { ...rest }, { new: true });

        if (Connections) updatedStation.Connections = Connections;

        return updatedStation.save();
      } catch (error) {
        throw new UserInputError(`Error while modifying the station: ${error.message}`);
      }
    },
    deleteStation: async (_, args) => {
      try {
        const { id } = args;

        await Station.findByIdAndDelete(id);

        return id;
      } catch (error) {
        throw new UserInputError(`Error while deleting a station: ${error.message}`);
      }
    }
  }
}