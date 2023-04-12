const { buscarUsuarioEspecifico, criarNovoUsuario } = require("../../../modules/Usuarios/repositories/Usuario.repository")
const { mensagens, resMensagens } = require("../../../services/util")
const bcrypt = require("bcrypt")

const { UsuarioModelClass } = require("../../../modules/Usuarios/model/Usuario.Model.Class")
const retornoMessage = new resMensagens()

class Registrar extends UsuarioModelClass {
    registrar = async (req, res) => {
        const { nome, email, senha, confirmarSenha } = req.body

        const validacao = this.validacoes(nome, email, senha, confirmarSenha, mensagens)
        if (validacao) return retornoMessage.dadosNaoEncontrado(res, validacao)

        const usuarioExistente = await buscarUsuarioEspecifico(email)
        const criptografiaSenhaSalt = await bcrypt.genSalt(12)
        const criptografiaSenhaHash = await bcrypt.hash(senha, criptografiaSenhaSalt)

        if (usuarioExistente) {
            return retornoMessage.dadosNaoEncontrado(res, mensagens.emailUtilizado)
        }

        try {
            await criarNovoUsuario(nome, email, criptografiaSenhaHash)
            return retornoMessage.cadastroSucesso(res, mensagens.userCriadoComSucesso)
        } catch (error) {
            return retornoMessage.errorNoServidor(res, mensagens.errorNoServidor)
        }
    }
}

module.exports = new Registrar()