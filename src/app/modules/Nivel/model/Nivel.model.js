const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    atividade: { type: String },
    variaveis: { type: Array },
    dificuldade: { type: Number },
    sequenciaCorreta: { type: String },
    autor: { type: mongoose.Schema.Types.ObjectId },
    ativo: { type: Boolean }
})

module.exports = mongoose.model("Niveis", Schema)