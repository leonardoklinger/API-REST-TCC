const { buscarUsuarioEspecificoEmail, buscarUsuarioEspecificoNome, criarNovoUsuario } = require("../../../modules/Usuarios/repositories/Usuario.repository")
const { mensagens, resMensagens, Servico } = require("../../../services/util")
const bcrypt = require("bcrypt")

const { UsuarioModelClass } = require("../../../modules/Usuarios/model/Usuario.Model.Class")
const retornoMessage = new resMensagens()
const servico = new Servico()

class Registrar extends UsuarioModelClass {
    registrar = async (req, res) => {
        const { nome, email, senha, confirmarSenha, admin } = req.body

        const validacao = this.validacoes(nome, email, senha, confirmarSenha, mensagens)
        if (validacao) return retornoMessage.dadosNaoEncontrado(res, validacao)

        const usuarioExistenteEmail = await buscarUsuarioEspecificoEmail(email)
        const usuarioExistenteNome = await buscarUsuarioEspecificoNome(nome)
        const criptografiaSenhaSalt = await bcrypt.genSalt(12)
        const criptografiaSenhaHash = await bcrypt.hash(senha, criptografiaSenhaSalt)

        if (usuarioExistenteEmail) {
            return retornoMessage.dadosNaoEncontrado(res, mensagens.emailUtilizado)
        }

        if (usuarioExistenteNome) {
            return retornoMessage.dadosNaoEncontrado(res, mensagens.nomeUtilizado)
        }

        if(!servico.verificarEmail(email)) {
            return retornoMessage.dadosNecessarios(res, mensagens.emailInvalido)
        }

        try {
            await criarNovoUsuario(nome, email, criptografiaSenhaHash, admin)
            return retornoMessage.cadastroSucesso(res, mensagens.userCriadoComSucesso)
        } catch (error) {
            return retornoMessage.errorNoServidor(res, mensagens.errorNoServidor)
        }
    }
}

module.exports = new Registrar()