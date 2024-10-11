const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://127.0.0.1:27017/ModbusData';

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to the MongoDB server
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // Perform your MongoDB operations here

    // For demonstration purposes, let's simulate a server disconnection
    // setTimeout(() => {
    //   client.close();
    // }, 5000); // Close the connection after 5 seconds
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Event listener for handling disconnection
client.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Event listener for handling reconnection
client.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

// Event listener for handling errors
client.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Event listener for handling when the driver is trying to reconnect
client.on('attemptReconnect', () => {
  console.log('Attempting to reconnect to MongoDB');
});

// Event listener for handling when the driver successfully reconnects
client.on('reconnect', () => {
  console.log('Successfully reconnected to MongoDB');
});



// module.exports = connectDbNew;