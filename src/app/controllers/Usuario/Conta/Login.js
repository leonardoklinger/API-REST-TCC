const { buscarUsuarioEspecificoEmail } = require("../../../modules/Usuarios/repositories/Usuario.repository")
const { mensagens, resMensagens, Servico } = require("../../../services/util")
const variaveis = require("../../../../config/Ambiente/start")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { UsuarioModelClass } = require("../../../modules/Usuarios/model/Usuario.Model.Class")
const retornoMessage = new resMensagens()
const servico = new Servico()

class Login extends UsuarioModelClass {
    login = async (req, res) => {
        const { email, senha } = req.body

        const validacao = this.validacoes(true, email, senha, true, mensagens)
        if (validacao) return retornoMessage.dadosNaoEncontrado(res, validacao)

        const usuarioExistente = await buscarUsuarioEspecificoEmail(email)
        if (!usuarioExistente) {
            return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
        }
        
        if (!await servico.checkarSenha(senha, usuarioExistente.senha)) {
            return retornoMessage.naoAutorizado(res, mensagens.senhaInvalida)
        }

        try {
            const usuarioAdmin = usuarioExistente.admin ? true : false
            const secret = variaveis.SECRET
            const token = jwt.sign({ id: usuarioExistente._id, admin: usuarioAdmin }, secret, {
                expiresIn: "10h"
            })
            
            return retornoMessage.dadosSucesso(res, { message: mensagens.autenticacao, token: token, id: usuarioExistente._id })
        } catch (error) {
            return retornoMessage.errorNoServidor(res, mensagens.errorNoServidor)
        }
    }
}

module.exports = new Login()