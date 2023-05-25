const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    data: { type:  Date, default: Date.now() },
    logs: { type: Array },
})

module.exports = mongoose.model("AdministradoLogs", Schema)