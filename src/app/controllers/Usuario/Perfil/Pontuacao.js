const { buscarPontuacaoUser, cadastrarPontuacaoUser, updatePontuacaoUser } = require("../../../modules/Usuarios/repositories/PontuacaoUser.repository")
const { mensagens, resMensagens } = require("../../../services/util")
const retornoMessage = new resMensagens()

class Pontuacao {
    pontuacao = async (req, res) => {

        if (!req.userId) return retornoMessage.dadosNecessarios(res, mensagens.idUser)

        try {
            const pontuacaoExistente = await buscarPontuacaoUser(req.userId)
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

                dadosAtualizados.push({ level: element, porcentagemAcerto: Math.round(soma), jogadas: dados.length })
            })

            return retornoMessage.dadosSucesso(res, dadosAtualizados)
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, error)
        }
    }

    cadastrarPontuacao = async (req, res) => {
        const { level, porcentagemAcertos } = req.body

        if (!level) {
            return dadosNecessarios(res, mensagens.informeUmLevel)
        }

        if (!porcentagemAcertos) {
            return dadosNecessarios(res, mensagens.informePorcentagemDeAcertos)
        }

        try {
            const pontuacaoUser = await buscarPontuacaoUser(req.userId)
            const pontuacaoNovaUser = this.calcularPorcentagemDaPontuacao(pontuacaoUser, porcentagemAcertos)
            await updatePontuacaoUser(req.userId, { level: level, porcentagemAcerto: porcentagemAcertos }, pontuacaoNovaUser)
            return retornoMessage.cadastroSucesso(res, mensagens.pontuacaoAtualizada)
        } catch (error) {
            if (!error) {
                try {
                    await cadastrarPontuacaoUser(req.userId, { level: level, porcentagemAcerto: porcentagemAcertos }, porcentagemAcertos)
                    return retornoMessage.cadastroSucesso(res, mensagens.pontuacaoCadastrada)
                } catch (error) {
                    return retornoMessage.errorNoServidor(res, error)
                }
            }

            return retornoMessage.errorNoServidor(res, error)
        }
    }

    calcularPorcentagemDaPontuacao(pontuacao, porcentagemNova) {
        let pontuacaoUser = [porcentagemNova]
        pontuacao.level.forEach(({porcentagemAcerto}) => {
            pontuacaoUser.push(porcentagemAcerto)
        })

        let pontuacaoTotalUser = 0
        pontuacaoUser.forEach((resultado) => {
            pontuacaoTotalUser += resultado / (pontuacaoUser.length)
        })

        return pontuacaoTotalUser.toFixed(2)
    }
}

module.exports = new Pontuacao()