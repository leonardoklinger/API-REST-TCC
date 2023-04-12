const NivelModel = require("../model/Nivel.model")

class nivelRepository {
    buscarNivelEspecifico = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const nivelEspecifico = await NivelModel.findById({ _id: id })
                resolve(nivelEspecifico)
            } catch (error) {
                reject(error)
            }
        })
    }

    buscarTodosNiveis = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await NivelModel.find())
            } catch (error) {
                reject(error)
            }
        })
    }

    criarNovoNivel = async (atividade, variaveis, dificuldade, sequenciaCorreta, autor, ativo) => {
        const nivelCadastrar = new NivelModel({
            atividade: atividade,
            variaveis: variaveis,
            dificuldade: dificuldade,
            sequenciaCorreta: sequenciaCorreta,
            autor: autor,
            ativo: ativo
        })

        return new Promise(async (resolve, reject) => {
            try {
                resolve(await nivelCadastrar.save())
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new nivelRepository()