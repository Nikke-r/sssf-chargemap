import { gql } from 'apollo-server-express';

export default gql`
  type Station {
    id: ID
    Title: String
    Town: String
    AddressLine1: String
    StateOrProvince: String
    Postcode: String
    Location: Location
    Connections: [Connections]
  }

  type Location {
    type: String
    coordinates: [Float]
  }

  input LatLng {
    lat: Float
    lng: Float
  }

  input Bounds {
    _southWest: LatLng
    _northEast: LatLng
  }

  input NewConnections {
    ConnectionTypeID: String
    CurrentTypeID: String
    LevelID: String
    Quantity: Int
  }

  input NewLocation {
    coordinates: [Float]
  }

  extend type Query {
    station(id: ID): Station
    stations(start: Int = 0, limit: Int = 10, bounds: Bounds): [Station]
  }

  extend type Mutation {
    addStation(
      Connections: [NewConnections],
      Postcode: String,
      Title: String,
      AddressLine1: String,
      StateOrProvince: String,
      Town: String,
      Location: NewLocation,
    ): Station,
    modifyStation(
      id: String!,
      Connections: [NewConnections],
      Postcode: String,
      Title: String,
      AddressLine1: String,
      StateOrProvince: String,
      Town: String,
    ): Station,
    deleteStation(id: ID): ID
  }
`;