const { compiladorResult } = require("./Compilador/Compilador")
const { registrar } = require("./Usuario/Register")
const { login } = require("./Usuario/Login")
const { resetarSenha, gerarUrl } = require("./Usuario/RestarSenha")

module.exports = {
    compiladorResult,
    registrar,
    login,
    resetarSenha,
    gerarUrl
}