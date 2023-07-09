const { buscarUsuarioEspecificoEmail, buscarUsuarioEspecificoNome } = require("../../../modules/Usuarios/repositories/Usuario.repository")
const { mensagens, resMensagens, Servico } = require("../../../services/util")
const variaveis = require("../../../../config/Ambiente/start")
const jwt = require("jsonwebtoken")
const redis = require("../../../Cache/redis")

const { UsuarioModelClass } = require("../../../modules/Usuarios/model/Usuario.Model.Class")
const retornoMessage = new resMensagens()
const servico = new Servico()

class Login extends UsuarioModelClass {
    login = async (req, res) => {
        const { email, senha } = req.body

        const validacao = this.validacoes(true, email, senha, true, mensagens)
        if (validacao) return retornoMessage.dadosNaoEncontrado(res, validacao)

        let usuarioExistente = {}

        if(servico.verificarEmail(email)) {
            const usuarioExistenteEmail = await buscarUsuarioEspecificoEmail(email)
            if (!usuarioExistenteEmail) {
                return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
            } else {
                usuarioExistente = usuarioExistenteEmail
            }
        } else {
            const usuarioExistenteNome = await buscarUsuarioEspecificoNome(email)
            if (!usuarioExistenteNome) {
                return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
            } else {
                usuarioExistente = usuarioExistenteNome
            }
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

            await redis.setar(usuarioExistente._id, { token: token, admin: usuarioAdmin, id: usuarioExistente._id, nome: usuarioExistente.nome }, 10 * 60 * 60)
            if(!(await redis.buscar(usuarioExistente._id))) {
            }
            
            return retornoMessage.dadosSucesso(res, { 
                message: mensagens.autenticacao, 
                token: token, 
                id: usuarioExistente._id, 
                admin: usuarioAdmin
            })
        } catch (error) {
            return retornoMessage.errorNoServidor(res, mensagens.errorNoServidor)
        }
    }
}

module.exports = new Login()