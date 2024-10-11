const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');
const path = require("path");
const connectDb = require("./connections/dbConnection");
const {modbusConnect, CronJob} = require("./connections/modbusConnection");
const modbusConnectNew = require("./connections/modbusConnectionNew");

const check = require('./connections/test');



// connectDbNew();
connectDb();
// CheckConnection();
CronJob();
modbusConnect();
check();

// modbusConnectNew();
