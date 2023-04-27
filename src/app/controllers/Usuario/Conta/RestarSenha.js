const { resetSenhaUsuario, buscarUsuarioEspecifico } = require("../../../modules/Usuarios/repositories/Usuario.repository")
const { mensagens, resMensagens } = require("../../../services/util")
const { enviadorEmail } = require("../../../services/Email/Email.services")
const variaveis = require("../../../../config/Ambiente/start")
const bcrypt = require("bcrypt")

const tokenCriptografado = require("crypto")
const redis = require("../../../Cache/redis")

const { UsuarioModelClass } = require("../../../modules/Usuarios/model/Usuario.Model.Class")
const retornoMessage = new resMensagens()

class ResetarSenha extends UsuarioModelClass {
    gerarUrl = async (req, res) => {
        const { email } = req.query

        const validacao = this.validacoes(true, email, true, true, mensagens)
        if (validacao) return retornoMessage.dadosNaoEncontrado(res, validacao)

        const usuarioExistente = await buscarUsuarioEspecifico(email)
        if (!usuarioExistente) return retornoMessage.dadosNaoEncontrado(res, mensagens.emailNaoEncontrado)

        try {
            const token = tokenCriptografado.randomBytes(20).toString("base64url")
            await redis.setar(token, { token: token, email: email }, 60 * 5)
            this.envioEmail(res, email, token, usuarioExistente)        
        } catch (error) {
            console.log(error)
            return errorServidor(res, error)
        }
    }

    resetarSenha = async (req, res) => {
        const { token } = req.params
        const { senha, confirmarSenha } = req.body

        const validacao = this.validacoes(true, true, senha, confirmarSenha, mensagens)
        if (validacao) return retornoMessage.dadosNaoEncontrado(res, validacao)

        if (!token) {
            return retornoMessage.dadosNecessarios(res, mensagens.tokenVazio)
        }

        try {
            const dados = await redis.buscar(token)
            const criptografiaSenhaSalt = await bcrypt.genSalt(12)
            const criptografiaSenhaHash = await bcrypt.hash(senha, criptografiaSenhaSalt)
            let dadosUser = await buscarUsuarioEspecifico(dados.email)
            if (!dadosUser) return dadosNaoEncontrado(res, mensagens.emailInvalido)

            resetSenhaUsuario(dadosUser._id, criptografiaSenhaHash).then(async result => {
                await redis.deletar(token)
                return retornoMessage.dadosSucesso(res, result)
            }).catch(error => {
                return retornoMessage.dadosNaoEncontrado(res, error)
            })
        } catch (error) {
            return retornoMessage.naoAutorizado(res, mensagens.tokenExpirado)
        }
    }

    envioEmail = async (res, email, token, usuarioExistente) => {
        await enviadorEmail(email, "resetSenha", `${variaveis.URL_FRONT_END}${token}`, "Você solicitou a redefinição de sua senha", `Olá ${usuarioExistente.nome}, você está precisando de ajuda com sua senha? Bem, click no botão abaixo para resetar sua senha \nOps: você tem 5 minutos para resetar a sua senha antes que o token fique inválido !`)
        return retornoMessage.dadosSucesso(res, mensagens.resetSenha)
    }
}

module.exports = new ResetarSenha()