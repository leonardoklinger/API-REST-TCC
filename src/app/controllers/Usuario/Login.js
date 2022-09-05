const { buscarUsuarioEspecifico } = require("../../services/DB/Usuario/Usuario.services")
const { errorServidor, mensagens, dadosNecessarios, dadosNaoEncontrado } = require("../../services/util")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class Login {
    login = async (req, res) => {
        const { email, senha } = req.body

        if (!email) {
            return dadosNecessarios(res, mensagens.emailObrigatorio)
        }

        if (!senha) {
            return dadosNecessarios(res, mensagens.senhaObrigatoria)
        }

        const usuarioExistente = await buscarUsuarioEspecifico(email)

        if (!usuarioExistente) {
            return dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
        }

        const checkarSenha = await bcrypt.compare(senha, usuarioExistente.senha)
        if (!checkarSenha) {
            return dadosNecessarios(res, mensagens.senhaInvalida)
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({id: usuarioExistente._id,}, secret, {
                expiresIn: "10h"
            })
            return res.status(200).json({ mensagem: mensagens.autenticacao, token })
        } catch (error) {
            return errorServidor(res, mensagens.errorNoServidor)
        }
    }
}

module.exports = new Login()