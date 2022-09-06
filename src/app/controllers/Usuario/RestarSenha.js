const { resetSenhaUsuario, buscarUsuarioEspecifico } = require("../../modules/Usuarios/repositories/Usuario.repository")
const { dadosNaoEncontrado, mensagens, dadosOk, dadosNecessarios, invalido, errorServidor } = require("../../services/util")
const { enviadorEmail } = require("../../services/Email/Email.services")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class ResetarSenha {
    gerarUrl = async (req, res) => {
        const { email } = req.query
        const usuarioExistente = await buscarUsuarioEspecifico(email)
        if (!usuarioExistente) return dadosNaoEncontrado(res, mensagens.emailNaoEncontrado)

        try {
            const secret = process.env.SENHA_EMAIL
            const token = jwt.sign({ id: usuarioExistente._id, email: email }, secret, {
                expiresIn: "5m"
            })

            await enviadorEmail(email, "resetSenha", `${process.env.URL_FRONT_END}${token}`,"Você solicitou a redefinição de sua senha", `Olá ${usuarioExistente.nome}, você está precisando de ajuda com sua senha? Bem, click no botão abaixo para resetar sua senha \nOps: você tem 5 minutos para resetar a sua senha antes que o token fique inválido !`)
            return dadosOk(res, { mensagem: mensagens.resetSenha })
        } catch (error) {
            console.log(error)
            return errorServidor(res, error)
        }
    }

    resetarSenha = async (req, res) => {
        const { token } = req.params
        const { senha, confirmarSenha } = req.body

        if (!senha) {
            return dadosNecessarios(res, mensagens.senha)
        }

        if (senha !== confirmarSenha) {
            return dadosNecessarios(res, mensagens.senhaDiferentes)
        }

        if (!token) {
            return dadosNecessarios(res, mensagens.tokenVazio)
        }

        try {
            const dados = jwt.verify(token, process.env.SENHA_EMAIL)
            const criptografiaSenhaSalt = await bcrypt.genSalt(12)
            const criptografiaSenhaHash = await bcrypt.hash(senha, criptografiaSenhaSalt)
            let dadosUser = await buscarUsuarioEspecifico(dados.email,)
            if (!dadosUser) return dadosNaoEncontrado(res, mensagens.emailInvalido)

            resetSenhaUsuario(dados.id,criptografiaSenhaHash).then(result => {
                return dadosOk(res, result)
            }).catch(error => {
                return dadosNaoEncontrado(res, error)
            })
        } catch (error) {
            return invalido(res, mensagens.tokenExpirado)
        }
    }
}

module.exports = new ResetarSenha()