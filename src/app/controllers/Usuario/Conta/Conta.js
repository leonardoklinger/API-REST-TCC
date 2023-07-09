const { mensagens, resMensagens, Servico } = require("../../../services/util")
const variaveis = require("../../../../config/Ambiente/start")
const jwt = require("jsonwebtoken")
const redis = require("../../../Cache/redis")
const retornoMessage = new resMensagens()

class Conta {
    checkarConta  = async (req, res) => {
        const idUsuario = req.userId
        const buscarUsuario = await redis.buscar(idUsuario)

        if(!buscarUsuario) return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
        jwt.verify(buscarUsuario.token, variaveis.SECRET, (err) => {
            if(err == null) {
                return retornoMessage.dadosSucesso(res, buscarUsuario)
            }
        })
    }
}

module.exports = new Conta()