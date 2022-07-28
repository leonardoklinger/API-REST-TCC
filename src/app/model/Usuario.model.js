const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    senha: { type: String }
})

module.exports = mongoose.model("Usuario", Schema)