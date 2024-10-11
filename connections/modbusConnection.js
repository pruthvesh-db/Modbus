const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
const fs = require('fs');
const path = require('path');
const asyncHandler = require("express-async-handler");
const modbus = require('../Models/dataModel');
const moment = require('moment');
// const check = require('../CronController/cronConfig');
const schedule = require('node-schedule');
const mqtt = require("mqtt");



const mqttclient = mqtt.connect("mqtt://localhost");





var SerialData = [];
var DataSerial = [];
var ModbusData1 = {"ModbusData":{voltage:"", current:""}, "timestamp":""};
var mqttdata = {"x":"", "y":""};
var fileName;




// open connection to a tcp line
const modbusConnect = () => {

client.connectTCP(process.env.TCP_IP, { port: process.env.DEVICE_PORT });
client.setID(process.env.DEVICE_ID);
// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.

// MQTT Subscribe
mqttclient.on("connect", () => {
    mqttclient.subscribe("presence", (err) => {
      if (err) {
       console.log(err);
      }
    });
  });


setInterval(
    function() {
    // console.log("test"+fileName);--------------------
    client.readHoldingRegisters(process.env.HR_STARTING_VALUE, process.env.HR_DATA_LENGTH, function(err, data) {
        // console.log(data.data);-----------------
        SerialData = data.data;
        // console.log(`serial data: ${SerialData}`);
        // modbus.create({SerialData});

        ModbusData1.ModbusData.current = SerialData[process.env.ID_CURRENT];
        ModbusData1.ModbusData.voltage = SerialData[process.env.ID_VOLTAGE];
        mqttdata.y = SerialData[process.env.ID_VOLTAGE];
        mqttdata.x = SerialData[process.env.ID_CURRENT];
        ModbusData1.timestamp =  new Date();
        // console.log(mqttdata);


        mqttclient.publish("Modbus", JSON.stringify(ModbusData1));
        
        // console.log(ModbusData1);-------------------
        // console.log(ModbusLocal);
        // modbus.create({ModbusData});
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       
        
        let tempfile;
        if(fileName == undefined){
            fs.writeFileSync('./localStorage/'+moment().format('YYYYMMDD_hhmmss') + ".json", '[]');
            fileName = moment().format('YYYYMMDD_hhmmss') + ".json"
        }
        // console.log(fileName);-------------------------------------
        var iniPath = fileName || tempfile;
        var path = './localStorage/'+ iniPath;
        // console.log(path);-----------------------------
        fs.readFile(path, 'utf8', function readFileCallback(err, data){
        if (err){
            // console.log(err);------------------------------------
            return tempfile;
        } else {
        parseData = JSON.parse(data); //now it an object
        parseData.push(ModbusData1); //add some data
        strData = JSON.stringify(parseData); //convert it back to json
        // console.log(strData);
        fs.writeFileSync(path, strData, 'utf8'); // write it back 
    }});


        // modbus.create({ModbusData});
        // console.log("--------------------------------------------------------------------------------");------------------------


        
    });
}, 500);

// setInterval(function() {
//     ModbusData.current = SerialData[0];
//     ModbusData.voltage = SerialData[1];

//     console.log(ModbusData);

// }, 5000);

};

const CronJob = () => { schedule.scheduleJob('* * * * * ', () => {
    var path = './localStorage/'+moment().format('YYYYMMDD_hhmmss') + ".json";
    const CreateFile = fs.writeFileSync(path, '[]');
    // console.log(moment().format('YYYYMMDD_hhmmss') +"  File Created..........");-----------------------------
    fileName = moment().format('YYYYMMDD_hhmmss')+".json";
    // fileName = "test"
    // console.log(fileName);
    // return fileName;
},
); 
};

module.exports = {modbusConnect, CronJob};