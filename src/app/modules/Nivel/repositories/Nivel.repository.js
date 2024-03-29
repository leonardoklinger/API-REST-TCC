const NivelModel = require("../model/Nivel.model")
const { Types } = require("mongoose")

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

    buscarTodosNiveis = async (paginaAtual, quantidadeExibir) => {
        return new Promise(async (resolve, reject) => {
            try {
                const totalNivel = await NivelModel.find({ ativo: true }).countDocuments()
                const totalPagina = Math.ceil(totalNivel / quantidadeExibir)
                
                if (paginaAtual < 1 || paginaAtual > totalPagina) {
                    reject("Número da página informado está inválido")
                }

                const nivel = await NivelModel.find({ ativo: true }).skip((paginaAtual - 1) * quantidadeExibir).limit(quantidadeExibir).exec()
                resolve({ Niveis: nivel, totalPagina: totalPagina })
            } catch (error) {
                reject(error)
            }
        })
    }

    buscarNivelPorDificuldade = async (dificuldade, paginaAtual, quantidadeExibir) => {
        return new Promise(async (resolve, reject) => {
            try {
                const totalNivel = await NivelModel.find({ dificuldade: dificuldade, ativo: true }).countDocuments()
                const totalPagina = Math.ceil(totalNivel / quantidadeExibir)
                
                if (paginaAtual < 1 || paginaAtual > totalPagina) {
                    reject("Número da página informado está inválido")
                }

                const nivel = await NivelModel.find({ dificuldade: dificuldade, ativo: true }).skip((paginaAtual - 1) * quantidadeExibir).limit(quantidadeExibir).exec()
                resolve({ Niveis: nivel, totalPagina: totalPagina })
            } catch (error) {
                reject(error)
            }
        })
    }

    buscarTodosNiveisParaSerAprovados = async (paginaAtual, quantidadeExibir) => {
        return new Promise(async (resolve, reject) => {
            try {
                const totalNivelParaSerAprovado = await NivelModel.find({ ativo: false }).countDocuments()
                const totalPagina = Math.ceil(totalNivelParaSerAprovado / quantidadeExibir)
                
                if (paginaAtual < 1 || paginaAtual > totalPagina) {
                    reject("Número da página informado está inválido")
                }

                const niveisNaoAprovados = await NivelModel.aggregate([
                    { $lookup: 
                        {
                            from: "usuarios", 
                            localField: "autor", 
                            foreignField: "_id", 
                            as: "usuario"
                        }
                    },
                    { $match: { "ativo": false }},
                    { $project: {  
                            _id: 1, 
                            atividade: 1, 
                            variaveis: 1,
                            dificuldade: 1, 
                            sequenciaCorreta: 1, 
                            ativo: 1, 
                            usuario: { nome: 1 } 
                        } 
                    }
                ]).skip((paginaAtual  - 1) * quantidadeExibir).limit(quantidadeExibir).exec()
                
                resolve({ Niveis: niveisNaoAprovados, totalPagina: totalPagina })
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

    naoAprovarNivelUsuario = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await NivelModel.findByIdAndDelete({ _id: id }))
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new nivelRepository()