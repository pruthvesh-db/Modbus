/* eslint-disable no-console, spaced-comment */

// create an empty modbus client
//let ModbusRTU = require("modbus-serial");
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
const dotenv = require('dotenv').config();


const networkErrors = ["ESOCKETTIMEDOUT", "ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "EHOSTUNREACH"];
const modbusConnectNew = () => {

// open connection to a serial port
//client.connectRTUBuffered("/dev/ttyUSB0", {baudRate: 9600})
setInterval(function(){
    client.connectTCP(process.env.TCP_IP, { port: process.env.DEVICE_PORT })
    .then(setClient)
    .then(function(){})
        // console.log("Connected"); })
    .catch(function(e) {
        console.log(e.message); })},1000);

function setClient() {
    // set the client's unit id
    // set a timout for requests default is null (no timeout)
    client.setID(1);
    client.setTimeout(1000);

    // run program
    run();
}

function run() {
    client.readHoldingRegisters(0, 4)
        .then(function(d) {
            const floatA = d.data[0];
            const floatB = d.data[1];
            const floatC = d.data[2];
            console.log("Receive:", floatA, floatB, floatC); })
        .catch(function(e) {
            console.log(e.message); })
        .then(close);
}

function close() {
    client.close();
}
};

module.exports = modbusConnectNew;