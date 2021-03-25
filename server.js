'use strict';

require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;
const stationRoute = require('./routes/stationsRoute');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/stations', stationRoute);

db.on('connected', () =>  app.listen(PORT));