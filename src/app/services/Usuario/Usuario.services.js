const UsuarioModel = require("../../model/Usuario.model")

const buscarUsuarioEspecifico = async (email) => {
    let usuario = null
    if (email) {
        usuario = await UsuarioModel.findOne({ email: email })
    }
    return usuario
}

const criarNovoUsuario = async (nome, email, senha) => {
    const usuarioCadastrar = new UsuarioModel({
        nome,
        email,
        senha: senha
    })

    try {
        return await usuarioCadastrar.save()
    } catch (error) {
        return error
    }
}

module.exports = {
    buscarUsuarioEspecifico,
    criarNovoUsuario
}