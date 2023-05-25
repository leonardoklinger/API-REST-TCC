const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String },
    senha: { type: String },
    admin: { type: Boolean }
})

module.exports = mongoose.model("Usuario", Schema)