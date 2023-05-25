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
                resolve(await NivelModel.find({ ativo: true }))
            } catch (error) {
                reject(error)
            }
        })
    }

    buscarNivelPorDificuldade = async (dificuldade) => {
        return new Promise(async (resolve, reject) => {
            try {
                const nivelPorDificuldade = await NivelModel.find({ dificuldade: dificuldade, ativo: true })
                resolve(nivelPorDificuldade)
            } catch (error) {
                reject(error)
            }
        })
    }

    buscarTodosNiveisParaSerAprovados = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const naoAprovados = await NivelModel.find({ ativo: false })
                resolve(naoAprovados)
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

    excluirTodosNivelUsuario = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await NivelModel.deleteMany({ autor: id }))
            } catch (error) {
                reject(error)
            }
        })
    }

    aprovarNivelUsuario = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await NivelModel.updateOne({ _id: id }, { ativo: true }))
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new nivelRepository()