const { compiladorResult } = require("./Compilador/Compilador")
const { registrar } = require("./Usuario/Register")
const { login } = require("./Usuario/Login")

module.exports = {
    compiladorResult,
    registrar,
    login
}