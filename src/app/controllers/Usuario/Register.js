const { buscarUsuarioEspecifico, criarNovoUsuario } = require("../../services/DB/Usuario/Usuario.services")
const { dadosNaoEncontrado, errorServidor, mensagens, cadastroOk, dadosNecessarios } = require("../../services/util")
const bcrypt = require("bcrypt")

class Registrar {
    registrar = async (req, res) => {
        const { nome, email, senha, confirmarSenha } = req.body
        const usuarioExistente = await buscarUsuarioEspecifico(email)
        const criptografiaSenhaSalt = await bcrypt.genSalt(12)
        const criptografiaSenhaHash = await bcrypt.hash(senha, criptografiaSenhaSalt)

        if (!nome) {
            return dadosNecessarios(res, mensagens.nome)
        }

        if (!email) {
            return dadosNecessarios(res, mensagens.email)
        }

        if (!senha) {
            return dadosNecessarios(res, mensagens.senha)
        }

        if (senha !== confirmarSenha) {
            return dadosNecessarios(res, mensagens.senhaDiferentes)
        }

        if (usuarioExistente) {
            return dadosNaoEncontrado(res, mensagens.emailUtilizado)
        }

        try {
            await criarNovoUsuario(nome, email, criptografiaSenhaHash)
            return cadastroOk(res, mensagens.userCriadoComSucesso)
        } catch (error) {
            return errorServidor(res, mensagens.errorNoServidor)
        }
    }
}

module.exports = new Registrar()