const { buscarPontuacaoUser, cadastrarPontuacaoUser, updatePontuacaoUser } = require("../../../modules/Usuarios/repositories/PontuacaoUser.repository")
const { mensagens, resMensagens } = require("../../../services/util")
const retornoMessage = new resMensagens()

class Pontuacao {
    pontuacao = async (req, res) => {
        const { idUser } = req.params

        if (!idUser) return retornoMessage.dadosNecessarios(res, mensagens.idUser)

        try {
            const pontuacaoExistente = await buscarPontuacaoUser(idUser)
            const { level } = pontuacaoExistente
            const dadosNaoDuplicados = []
            level.forEach(element => dadosNaoDuplicados.push(element.level))
            const tirandoItensDuplicados = [... new Set(dadosNaoDuplicados)]

            let dadosAtualizados = []

            tirandoItensDuplicados.forEach(element => {
                let dados = level.filter(e => e.level === element)
                let soma = 0

                for (let i in dados) {
                    soma += (dados[i].porcentagemAcerto / dados.length)
                }

                dadosAtualizados.push({ level: element, porcentagemAcerto: `${Math.round(soma)}%`, jogadas: dados.length })
            })

            return retornoMessage.dadosSucesso(res, dadosAtualizados)
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, error)
        }
    }

    cadastrarPontuacao = async (req, res) => {
        const { level, porcentagemAcertos, idUser } = req.body

        if (!level) {
            return dadosNecessarios(res, mensagens.informeUmLevel)
        }

        if (!porcentagemAcertos) {
            return dadosNecessarios(res, mensagens.informePorcentagemDeAcertos)
        }

        if (!idUser) {
            return dadosNecessarios(res, mensagens.idUser)
        }

        try {
            await buscarPontuacaoUser(idUser)
            await updatePontuacaoUser(idUser, { level: level, porcentagemAcerto: porcentagemAcertos })
            return retornoMessage.cadastroSucesso(res, mensagens.pontuacaoAtualizada)
        } catch (error) {
            if (!error) {
                try {
                    await cadastrarPontuacaoUser(idUser, { level: level, porcentagemAcerto: porcentagemAcertos })
                    return retornoMessage.cadastroSucesso(res, mensagens.userCriadoComSucesso)
                } catch (error) {
                    return retornoMessage.errorNoServidor(res, error)
                }
            }

            return retornoMessage.errorNoServidor(res, error)
        }
    }
}

module.exports = new Pontuacao()