const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database Connected : ",
            connect.connection.host,
            connect.connection.name
        );
    } catch(err){
        console.log("Database Connection Failed........\nRetry After Sometime");
        setTimeout(connectDb, 5000);
        // process.exit(1);
    }
};


//This event is delivered (!) so using it!


// const CheckConnection = () => {setInterval( function()
//     {mongoose.connection.on('error', function(err) {
//     if(err){console.log("Connection testing failed")};
//     });},
//     10000)};

module.exports = connectDb;
// module.exports = CheckConnection;