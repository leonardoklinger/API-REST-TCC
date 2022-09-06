const UsuarioModel = require("../model/Usuario.model")

const buscarUsuarioEspecifico = async (email) => {
    let usuario = null
    return new Promise(async (resolve, reject) => {
        if (email) {
            resolve(usuario = await UsuarioModel.findOne({ email: email }))
        }
        reject(usuario)
    })
}

const criarNovoUsuario = async (nome, email, senha) => {
    const usuarioCadastrar = new UsuarioModel({
        nome,
        email,
        senha: senha
    })

    return new Promise(async (resolve, reject) => {
        try {
            resolve(await usuarioCadastrar.save())
        } catch (error) {
            reject(error)
        }
    })
}

const resetSenhaUsuario = (id, senha) => {
    return new Promise(async (resolve, reject) => {
        try {
            let pegarDados = await UsuarioModel.findByIdAndUpdate({ _id: id }, { senha: senha })
            resolve(pegarDados)
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    buscarUsuarioEspecifico,
    criarNovoUsuario,
    resetSenhaUsuario
}