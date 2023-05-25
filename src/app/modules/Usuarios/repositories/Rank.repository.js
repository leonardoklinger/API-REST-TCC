const { Types } = require("mongoose")
const PontuacaoUser = require("../model/PontuacaoUser.Model")
class pontuacaoRepository {
    buscarTop10Usuarios = async () => {
        return new Promise(async (resolve, reject) => {
            const dados = await PontuacaoUser.aggregate([
                {$lookup: 
                    {
                        from: "usuarios", 
                        localField: "_id", 
                        foreignField: "_id", 
                        as: "users"
                    }
                },
                { $project: { quantidadeJogos: { $size: '$level' }, pontuacao: 1, _id: 1, users: { nome: 1 } } },
                { $sort: { quantidadeJogos: -1, pontuacao: -1 } },
                { $limit: 10 }
            ])

            if (dados) {
                resolve(dados)
            }
            reject(dados)
        })
    }

    rankUsuarioEspecifico = async (_id) => {
        return new Promise(async (resolve, reject) => {
            const dados = await PontuacaoUser.aggregate([
                {
                    $match: {
                      _id: Types.ObjectId(_id),
                    },
                  },
                { $lookup: 
                    {
                        from: "usuarios", 
                        localField: "_id", 
                        foreignField: "_id", 
                        as: "users"
                    }
                },
                { $project: { quantidadeJogos: { $size: '$level' }, pontuacao: 1, _id: 1, users: { nome: 1 } } },
            ])

            if (dados) {
                resolve(dados)
            }
            reject(dados)
        })
    }
}

module.exports = new pontuacaoRepository()