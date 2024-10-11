const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/ModbusData';

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to check the connection status
function checkConnection() {
  if (client.isConnected()) {
    console.log('MongoDB connected');
  } else {
    console.log('MongoDB disconnected');
  }
}

// Connect to the MongoDB server
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // Perform your MongoDB operations here

    // For demonstration purposes, let's simulate a server disconnection
    setTimeout(() => {
      client.close();
    }, 5000); // Close the connection after 5 seconds
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Check the connection status every 2 seconds
setInterval(checkConnection, 2000);
