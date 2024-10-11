const mongoose = require("mongoose");

const ModbusSchema = mongoose.Schema({
    ModbusData: {
        type: Object,
        required: [true],
    },
    timestamp: {
        type: String,
        required: [true],
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("modbus", ModbusSchema);