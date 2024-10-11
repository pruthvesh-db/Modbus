const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost");

client.on("connect", () => {
  client.subscribe("Modbus", (err) => {
    if (!err) {
    //  console.log(message.toString());
    }
  });
});

// client.publish("presence", "Hello ");

client.on("Modbus", (topic, Modbus) => {
  // message is Buffer
  console.log(Modbus.toString());
  // client.end();
});