const jwt = require("jsonwebtoken")
const variaveis = require("../../config/Ambiente/start")
const { mensagens, resMensagens } = require("../services/util")
const retornoMessage = new resMensagens()

class middleware {
    VerificarToken(req, res, next) {
        const header = req.headers["authorization"]
        const token = header && header.split(" ")[1]
        if (!token) return retornoMessage.dadosNaoEncontrado(res, mensagens.tokenVazio)
    
        jwt.verify(token, variaveis.SECRET, (err, resultado) => {
            if (err) {
                return retornoMessage.naoAutorizado(res, mensagens.token)
            }
            req.userId = resultado.id
            return next()
        })
    }

    VerificarPermissao(req, res, next) {
        const header = req.headers["authorization"]
        const token = header && header.split(" ")[1]
        if (!token) return retornoMessage.dadosNaoEncontrado(res, mensagens.tokenVazio)

        jwt.verify(token, variaveis.SECRET, (err, resultado) => {
            if (err) {
                return retornoMessage.naoAutorizado(res, mensagens.token)
            }

            if(resultado.admin) {
                req.userId = resultado.id
                return next()
            } else {
                return retornoMessage.naoAutorizado(res, mensagens.apenasAdmins)
            }
        })
    }
}

module.exports = new middleware()