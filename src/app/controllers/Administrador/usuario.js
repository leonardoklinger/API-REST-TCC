const { cadastrarLog, buscarLog, updateLog } = require("../../modules/Administrador/repositories/UserAdministrador.repository")
const { buscarUsuarioEspecificoId, buscarUsuarioEspecifico, buscarUsuarioEspecificoEmail, buscarUsuarioEspecificoNome, editarInformacoesUsuario, excluirContaUsuarioEspecifico } = require("../../modules/Usuarios/repositories/Usuario.repository")
const { excluirUsuarioPontuacao } = require("../../modules/Usuarios/repositories/PontuacaoUser.repository")
const { excluirTodosNivelUsuario } = require("../../modules/Nivel/repositories/Nivel.repository")
const { mensagens, resMensagens, Servico } = require("../../services/util")
const retornoMessage = new resMensagens()
const servico = new Servico()

class Admin {
    buscarUsuarioEspecifico = async (req, res) => {
        const { email, nome } = req.query

        if(!email && !nome) {
            return retornoMessage.dadosNecessarios(res, mensagens.emailOuNomeNaoInformado)
        }

        if(email) {
            if(!servico.verificarEmail(email)) {
                return retornoMessage.dadosNecessarios(res, mensagens.emailInvalido)
            }
        }

        try {
            const dados = await buscarUsuarioEspecifico(email, nome)
            return retornoMessage.dadosSucesso(res, dados)
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
        }
    }

    excluirContaUsuarioEspecifico = async (req, res) => {
        const { id } = req.body

        if(!id) {
            return retornoMessage.dadosNecessarios(res, mensagens.idUser)
        }

        try {
            const informacaoAdmin = await buscarUsuarioEspecificoId(req.userId)
            const informacaoUsuario = await buscarUsuarioEspecificoId(id)
            await excluirUsuarioPontuacao(id)
            await excluirTodosNivelUsuario(id)
            
            const dados = await excluirContaUsuarioEspecifico(id)
            
            if(dados.deletedCount > 0) {
                this.cadastrarLogAdmin(id, [{ admin: req.userId, mensagem: `Administrador:${informacaoAdmin.nome} | excluiu a conta do usuário ${informacaoUsuario.email}:${informacaoUsuario._id}` }])
                return retornoMessage.dadosSucesso(res, mensagens.usuarioExcluido)
            } else {
                return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
            }
        } catch (error) {
            return retornoMessage.errorNoServidor(res, mensagens.errorNoServidor)
        }
    }

    editarInformacoesUsuario = async (req, res) => {
        const informacoesParaSerEnviadas = ["nome", "senha", "email", "admin"]
        const informacoes = {}
        let informacoesUtilizadas = []
        const { id } = req.body

        const carregarInformacoes = informacoesParaSerEnviadas.map(async (info) => {
            if(req.body[info]) {
                if(info == "senha") {
                    informacoes[info] = await servico.criptografarSenha(req.body[info])
                } else  if(info == "nome" || info == "email") {
                    const email = await buscarUsuarioEspecificoEmail(req.body[info])
                    const nome = await buscarUsuarioEspecificoNome(req.body[info])
                    
                    if(email) {
                        return informacoesUtilizadas.push("emailUtilizado")
                    } else if(nome) {
                        return informacoesUtilizadas.push("nomeUtilizado")
                    }
                     informacoes[info] = req.body[info]
                } else {
                    informacoes[info] = req.body[info]
                }
            }
        })

        await Promise.all(carregarInformacoes)

        if(informacoesUtilizadas.length) {
            return retornoMessage.dadosNecessarios(res, informacoesUtilizadas.map(info => mensagens[info]).toString())
        }

        try {
            const informacaoAdmin = await buscarUsuarioEspecificoId(req.userId)
            const dadosAntigos = await editarInformacoesUsuario(id, informacoes)
            const dadosReformulados = this.dadosReformulados(dadosAntigos, informacoes, Object.keys(informacoes))
            this.cadastrarLogAdmin(id, { admin: req.userId, mensagem: `Administrador:${informacaoAdmin.nome} | editou as seguintes informações do usuário ${id} -> ${Object.keys(informacoes)}` })
            return retornoMessage.dadosSucesso(res, dadosReformulados)
        } catch (error) {
            return retornoMessage.errorNoServidor(res, error)
        }
    }

    cadastrarLogAdmin = async (id, log) => {
        return new Promise(async (resolve, reject) => {
            try {
                const dadosLogs = await buscarLog(id)
                if(dadosLogs) {
                   resolve(await updateLog(id, log))
                } else {
                    resolve(await cadastrarLog(id, log))
                }
                resolve(dados)
            } catch (error) {
                reject(error)
            }
        })
    }

    dadosReformulados = (dadosAntigos, dados, informacoesEditadas) => {
        const dadosNovos = dadosAntigos
        informacoesEditadas.map(resultado => {
            dadosNovos[resultado] = dados[resultado]
        })

        return dadosNovos
    }
}

module.exports = new Admin()