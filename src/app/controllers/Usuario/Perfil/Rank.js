const { buscarTop10Usuarios, rankUsuarioEspecifico } = require("../../../modules/Usuarios/repositories/Rank.repository")
const { mensagens, resMensagens } = require("../../../services/util")
const retornoMessage = new resMensagens()

class Pontuacao {
    top10Usuarios = async (req, res) => {
        try {
            const dados = await buscarTop10Usuarios()
            return retornoMessage.dadosSucesso(res, dados)
        } catch (error) {
            return retornoMessage.errorNoServidor(res, error)
        }
    }

    rankUsuarioEspecifico = async (req, res) => {
        const { idUser } = req.params
        if (!idUser) return retornoMessage.dadosNecessarios(res, mensagens.idUser)
        
        try {
            const dados = await rankUsuarioEspecifico(idUser)
            return retornoMessage.dadosSucesso(res, dados)
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
        }
    }
}

module.exports = new Pontuacao()