const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId},
    level: { type: Array },
})

module.exports = mongoose.model("PontuacaoUser", Schema)