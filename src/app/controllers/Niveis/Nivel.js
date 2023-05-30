const { mensagens, resMensagens } = require("../../../app/services/util")
const { criarNovoNivel, buscarNivelEspecifico, buscarTodosNiveis, buscarNivelPorDificuldade, buscarTodosNiveisParaSerAprovados, aprovarNivelUsuario } = require("../../../app/modules/Nivel/repositories/Nivel.repository")
const retornoMessage = new resMensagens()

class Nivel {
    criarNivel = async (req, res) => {
        const { atividade, variaveis, dificuldade, sequenciaCorreta } = req.body

        if (!atividade) return retornoMessage.dadosNecessarios(res, mensagens.atividadeNivel)
        if (!variaveis) return retornoMessage.dadosNecessarios(res, mensagens.variaveisNivel)
        if (!dificuldade) return retornoMessage.dadosNecessarios(res, mensagens.variaveisNivel)
        if (!sequenciaCorreta) return retornoMessage.dadosNecessarios(res, mensagens.variaveisNivel)
        if (!req.userId) return retornoMessage.dadosNaoEncontrado(res, mensagens.autorNivel)

        try {
            await criarNovoNivel(atividade, variaveis, dificuldade, sequenciaCorreta, req.userId, false)
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
            const { pagina } = req.query
            let todosNiveis = await buscarTodosNiveis(pagina, 8)
            return retornoMessage.dadosSucesso(res, todosNiveis)
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, { message: mensagens.todosNiveis, error: error  })
        }
    }

    buscarNivelPorDificuldade = async (req, res) => {
        try {
            const { dificuldade, pagina } = req.query
            let nivelPorDificuldade = await buscarNivelPorDificuldade(dificuldade, pagina, 8)
            return retornoMessage.dadosSucesso(res, nivelPorDificuldade)
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, { message: mensagens.todosNiveis, error: error })
        }
    }

    buscarTodosNiveisParaSerAprovados = async (req, res) => {
        try {
            const niveisNaoAprovados = await buscarTodosNiveisParaSerAprovados()
            return retornoMessage.dadosSucesso(res, niveisNaoAprovados)
        } catch (error) {
            return retornoMessage.errorNoServidor(res, error)
        }
    }

    aprovarNivel = async (req, res) => {
        const { id } = req.body
        try {
            await aprovarNivelUsuario(id)
            return retornoMessage.dadosSucesso(res, mensagens.nivelAprovado)
        } catch (error) {
            return retornoMessage.errorNoServidor(res, error)
        }
    }
}

module.exports = new Nivel()