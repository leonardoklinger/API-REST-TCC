const jwt = require("jsonwebtoken")
const variaveis = require("../../config/Ambiente/start")
const { mensagens, resMensagens } = require("../services/util")
const retornoMessage = new resMensagens()

class middleware {
    VerificarToken(req, res, next) {
        const header = req.headers["authorization"]
        const token = header && header.split(" ")[1]
    
        if (!token) return retornoMessage.dadosNaoEncontrado(res, mensagens.tokenVazio)
    
        jwt.verify(token, variaveis.SECRET, (err) => {
            if (err) {
                return retornoMessage.naoAutorizado(res, mensagens.token)
            }
            return next()
        });
    }
}

module.exports = new middleware()