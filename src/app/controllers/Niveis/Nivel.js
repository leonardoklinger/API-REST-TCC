const { mensagens, resMensagens } = require("../../../app/services/util")
const { criarNovoNivel, buscarNivelEspecifico, buscarTodosNiveis } = require("../../../app/modules/Nivel/repositories/Nivel.repository")
const retornoMessage = new resMensagens()

class Login {
    criarNivel = async (req, res) => {
        const { atividade, variaveis, dificuldade, sequenciaCorreta, autor } = req.body

        if (!atividade) return retornoMessage.dadosNecessarios(res, mensagens.atividadeNivel)
        if (!variaveis) return retornoMessage.dadosNecessarios(res, mensagens.variaveisNivel)
        if (!dificuldade) return retornoMessage.dadosNecessarios(res, mensagens.variaveisNivel)
        if (!sequenciaCorreta) return retornoMessage.dadosNecessarios(res, mensagens.variaveisNivel)
        if (!autor) return retornoMessage.dadosNaoEncontrado(res, mensagens.autorNivel)

        try {
            await criarNovoNivel(atividade, variaveis, dificuldade, sequenciaCorreta, autor, false)
            return retornoMessage.dadosSucesso(res, { message: mensagens.nivelCriado })
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, { message: mensagens.problemaNaCriacaoNivel, error: error })
        }
    }

    buscarNivelEspecifico = async (req, res) => {
        const { id } = req.query

        if(!id) return retornoMessage.dadosNecessarios(res, mensagens.idNivel)

        try {
            const nivelEspecifico = await buscarNivelEspecifico(id)
            return retornoMessage.dadosSucesso(res, {message: nivelEspecifico })
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, { message: mensagens.idNivelNaoEncontrado, error: error })
        }

    }
    
    buscarTodosNiveis = async (req, res) => {
        try {
            let todosNiveis = await buscarTodosNiveis()
            return retornoMessage.dadosSucesso(res, todosNiveis)
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, { message: mensagens.todosNiveis })
        }
    }
}

module.exports = new Login()