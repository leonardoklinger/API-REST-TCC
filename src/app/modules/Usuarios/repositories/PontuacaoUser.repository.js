const PontuacaoUser = require("../model/PontuacaoUser.Model")
const { mensagens } = require("../../../services/util")
const { Types } = require('mongoose');

class pontuacaoRepository {
    buscarPontuacaoUser = async (_id) => {
        return new Promise(async (resolve, reject) => {
            if (!Types.ObjectId.isValid(_id)) return reject(mensagens.idInformado)

            const dados = await PontuacaoUser.findById({ _id: _id })
            if (dados) {
                resolve(dados)
            }
            reject(dados)
        })
    }

    cadastrarPontuacaoUser = async (_id, level, pontuacao) => {
        const pontuacaoUserCadastrar = new PontuacaoUser({
            _id: _id,
            level: level,
            pontuacao: pontuacao
        })

        return new Promise(async (resolve, reject) => {
            if (!Types.ObjectId.isValid(_id)) return reject(mensagens.idInformado)

            try {
                await pontuacaoUserCadastrar.save()
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    updatePontuacaoUser = async (_id, level, pontuacao) => {
        return new Promise(async (resolve, reject) => {
            if (!Types.ObjectId.isValid(_id)) return reject(mensagens.idInformado)
            try {
                let updateDados = await PontuacaoUser.updateOne({ _id: _id }, { pontuacao: pontuacao, $push:{ level: level }})
                resolve(updateDados)
            } catch (error) {
                reject(error)
            }
        })
    }

    excluirUsuarioPontuacao = async (_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const dados = await PontuacaoUser.deleteOne({ _id: _id })
                resolve(dados)
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new pontuacaoRepository()