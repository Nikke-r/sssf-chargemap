import { gql } from 'apollo-server-express';

export default gql`
  type Connections {
    Quantity: Int
    ConnectionTypeID: ConnectionType
    CurrentTypeID: CurrentType
    LevelID: Level
  }
`;