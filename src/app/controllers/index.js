const { compiladorResult } = require("./Compilador/Compilador")
const { registrar } = require("./Usuario/Conta/Register")
const { login } = require("./Usuario/Conta/Login")
const { resetarSenha, gerarUrl } = require("./Usuario/Conta/RestarSenha")
const { cadastrarPontuacao, pontuacao } = require("./Usuario/Perfil/Pontuacao")

module.exports = {
    compiladorResult,
    registrar,
    login,
    resetarSenha,
    gerarUrl,
    cadastrarPontuacao,
    pontuacao
}