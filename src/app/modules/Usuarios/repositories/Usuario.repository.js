const UsuarioModel = require("../model/Usuario.model")

class usuarioRepository {
    buscarUsuarioEspecificoId = async (id) => {
        let usuario = null
        return new Promise(async (resolve, reject) => {
            if (id) {
                resolve(usuario = await UsuarioModel.findOne({ _id: id }))
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

    buscarUsuarioEspecifico = async (email, nome) => {
        let object = {}
        if(nome) {
            object = { nome: nome }
        } else if(email) {
            object = { email: email }
        }

        let usuario = null
        return new Promise(async (resolve, reject) => {
            try {
                resolve(usuario = await UsuarioModel.findOne(object))
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