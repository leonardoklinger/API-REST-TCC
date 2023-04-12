const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    atividade: { type: String },
    variaveis: { type: Array },
    dificuldade: { type: Number },
    sequenciaCorreta: { type: String },
    autor: { type: String },
    ativo: { type: Boolean }
})

module.exports = mongoose.model("Niveis", Schema)