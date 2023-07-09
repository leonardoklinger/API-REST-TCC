const UsuarioModel = require("../model/Usuario.model")

class usuarioRepository {
    buscarUsuarioEspecificoId = async (id) => {
        let usuario = null
        return new Promise(async (resolve, reject) => {
            if (id) {
                resolve(usuario = await UsuarioModel.findById(id))
            }
            reject(usuario)
        })
    }

    buscarUsuarioEspecificoEmail = async (email) => {
        let usuario = null
        return new Promise(async (resolve, reject) => {
            if (email) {
                resolve(usuario = await UsuarioModel.findOne({ email: email }))
            }
            reject(usuario)
        })
    }

    buscarUsuarioEspecificoNome = async (nome) => {
        let usuario = null
        return new Promise(async (resolve, reject) => {
            if (nome) {
                resolve(usuario = await UsuarioModel.findOne({ nome: nome }))
            }
            reject(usuario)
        })
    }

    criarNovoUsuario = async (nome, email, senha, admin) => {
        const usuarioCadastrar = new UsuarioModel({
            nome,
            email,
            senha: senha,
            admin: admin
        })

        return new Promise(async (resolve, reject) => {
            try {
                resolve(await usuarioCadastrar.save())
            } catch (error) {
                reject(error)
            }
        })
    }

    resetSenhaUsuario = (id, senha) => {
        return new Promise(async (resolve, reject) => {
            try {
                let pegarDados = await UsuarioModel.findByIdAndUpdate({ _id: id }, { senha: senha })
                resolve(pegarDados)
            } catch (error) {
                return reject(error)
            }
        })
    }

    editarInformacoesUsuario = (id, objeto) => {
        return new Promise(async (resolve, reject) => {
            try {
                let dadosEditado = await UsuarioModel.findByIdAndUpdate({ _id: id }, objeto)
                resolve(dadosEditado)
            } catch (error) {
                reject(error)
            }
        })
    }

    buscarUsuarioEspecifico = async (tipo, paginaAtual, quantidadeExibir) => {
        let object = {}
        if(tipo.nome) {
            object = { nome: {$regex: new RegExp('.*' + tipo.nome + '.*', 'i')} }
        } else if(tipo.email) {
            object = { email: tipo.email }
        }

        let usuario = null
        return new Promise(async (resolve, reject) => {
            try {
                const totalDeItens = await UsuarioModel.find(object).countDocuments()
                const totalPagina = Math.ceil(totalDeItens / quantidadeExibir)

                if (paginaAtual < 1 || paginaAtual > totalPagina) {
                    reject("Número da página informado está inválido")
                }

                let usuarioBuscar = await UsuarioModel.find(object).skip((paginaAtual - 1) * quantidadeExibir).limit(quantidadeExibir).exec()

                resolve(usuario = { usuarios: usuarioBuscar, totalPagina: totalPagina })
            } catch (error) {
                reject(usuario)
            }
        })
    }

    excluirContaUsuarioEspecifico = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                if(id) {
                    resolve(await UsuarioModel.deleteOne({ _id: id }))
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new usuarioRepository()