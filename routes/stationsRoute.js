const express = require('express');
const helpers = require('../utils/helper');
const router = express.Router();
const station = require('../models/stationsModel');
const connection = require('../models/connectionsModel');
require('../models/connectionTypeModel');
require('../models/levelTypeModel');
require('../models/currentTypeModel');

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const stationById = await station
      .findById(id)
      .populate({
        path: 'Connections',
        populate: [
          {
            path: 'ConnectionTypeID'
          },
          {
            path: 'LevelID'
          },
          {
            path: 'CurrentTypeID'
          }
        ]
      });

    res.json(stationById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { limit, topRight, bottomLeft }  = req.query;
    let response;

    if (topRight && bottomLeft) {
      const area = helpers.rectangelBounds(JSON.parse(topRight), JSON.parse(bottomLeft));
      response = await station
        .find({})
        .where('Location')
        .within(area)
        .limit(limit ? Number(limit) : 10)
        .populate({
          path: 'Connections',
          populate: [
            {
              path: 'ConnectionTypeID'
            },
            {
              path: 'LevelID'
            },
            {
              path: 'CurrentTypeID'
            }
          ]
        });
    } else {
      response = await station
        .find({})
        .limit(limit ? Number(limit) : 10)
        .populate({
          path: 'Connections',
          populate: [
            {
              path: 'ConnectionTypeID'
            },
            {
              path: 'LevelID'
            },
            {
              path: 'CurrentTypeID'
            }
          ]
        });
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const connections = req.body.Connections;

    const connIds = await Promise.all(connections.map(async connectionFromReq => {
      const newConnection = new connection(connectionFromReq);
      await newConnection.save();
      return newConnection._id;
    }));

    const newStation = new station({
      ...req.body.Station,
      Connections: connIds
    });

    await newStation.save();

    const populated = await newStation.populate({
      path: 'Connections',
      populate: [
        {
          path: 'ConnectionTypeID'
        },
        {
          path: 'LevelID'
        },
        {
          path: 'CurrentTypeID'
        }
      ]
    }).execPopulate();

    res.json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await station.findByIdAndDelete(id);

    res.status(200).json({ message: `Station with id ${id} deleted!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const { Station, Connections } = req.body;

    const document = await station.findByIdAndUpdate(Station._id, Station, { new: true });

    const updatedConnections = await Promise.all(Connections.map(async (newConn) => {
      try {
        const conn = await connection.findByIdAndUpdate(newConn._id, newConn);
        return conn._id;
      } catch (error) {
        console.log(error.message);
      }
    }));

    document.Connections = updatedConnections;

    await document.save();

    const populate = await document.populate('Connections').execPopulate();

    res.status(200).json(populate);
  } catch (error) {
   res.status(500).json({ error: error.message }); 
  }
});

module.exports = router;