const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios'},
    pontuacao: { type:  Number, default: 0 },
    level: { type: Array },
})

module.exports = mongoose.model("PontuacaoUser", Schema)