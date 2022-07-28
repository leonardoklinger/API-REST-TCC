const jwt = require("jsonwebtoken")
const { mensagens, invalido, dadosNaoEncontrado } = require("../services/util")

function VerificarToken(req, res, next) {
    const header = req.headers["authorization"]
    const token = header && header.split(" ")[1]

    if (!token) return dadosNaoEncontrado(res, mensagens.tokenVazio)

    jwt.verify(token, process.env.SECRET, (err) => {
        if (err) {
            return invalido(res, mensagens.token)
        }
        return next()
    });
}

module.exports = {
    VerificarToken
}