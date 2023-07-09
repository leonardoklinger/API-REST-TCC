const { cadastrarLog, buscarLog, updateLog } = require("../../modules/Administrador/repositories/UserAdministrador.repository")
const { 
    buscarUsuarioEspecificoId, 
    buscarUsuarioEspecifico, 
    buscarUsuarioEspecificoEmail, 
    buscarUsuarioEspecificoNome, 
    editarInformacoesUsuario, 
    excluirContaUsuarioEspecifico } = require("../../modules/Usuarios/repositories/Usuario.repository")
const { excluirUsuarioPontuacao } = require("../../modules/Usuarios/repositories/PontuacaoUser.repository")
const { excluirTodosNivelUsuario } = require("../../modules/Nivel/repositories/Nivel.repository")
const redis = require("../../Cache/redis")
const { mensagens, resMensagens, Servico } = require("../../services/util")
const retornoMessage = new resMensagens()
const servico = new Servico()

class Admin {
    buscarUsuarioEspecifico = async (req, res) => {
        const { usuario, pagina } = req.query

        let tipoDado = {}

        if(servico.verificarEmail(usuario)) {
            tipoDado = { email: usuario }
        } else if(tipoDado) {
            tipoDado = { nome: usuario }
        }

        try {
            const dados = await buscarUsuarioEspecifico(tipoDado, pagina, 8)
            return retornoMessage.dadosSucesso(res, dados)
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
        }
    }

    buscarUsuarioPorId = async (req, res) => {
        const { id } = req.query
        try {
            const dados = await buscarUsuarioEspecificoId(id)
            return retornoMessage.dadosSucesso(res, dados)
        } catch (error) {
            return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
        }
    }

    excluirContaUsuarioEspecifico = async (req, res) => {
        const { id } = req.query

        if(!id) {
            return retornoMessage.dadosNecessarios(res, mensagens.idUser)
        }

        try {
            const informacaoAdmin = await buscarUsuarioEspecificoId(req.userId)
            const informacaoUsuario = await buscarUsuarioEspecificoId(id)
            await excluirUsuarioPontuacao(id)
            await excluirTodosNivelUsuario(id)
            await redis.deletar(id)
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
        const informacoesAtualizadas = {}
        const { id } = req.body
        
        const dadosAntigos = await buscarUsuarioEspecificoId(id)

        const carregarInformacoes = informacoesParaSerEnviadas.map(async (info) => {
            if(req.body[info] !== dadosAntigos[info]) {
                informacoesAtualizadas[info] = req.body[info]
            }
        })

        const informacoes = Object.keys(informacoesAtualizadas).map(async (dadosNovo) => {
            switch (dadosNovo) {
                case "email":
                    const email = await buscarUsuarioEspecificoEmail(informacoesAtualizadas[dadosNovo])
                    if(email) return delete informacoesAtualizadas.email
                    break;

                case "nome":
                    const nome = await buscarUsuarioEspecificoNome(informacoesAtualizadas[dadosNovo])
                    if(nome) delete informacoesAtualizadas.nome
                    break;

                case "senha":
                    informacoesAtualizadas.senha = await servico.criptografarSenha(informacoesAtualizadas[dadosNovo])
                    break;
                default:
                    break;
            }
        })

        await Promise.all(carregarInformacoes)
        await Promise.all(informacoes)


        if(informacoesAtualizadas) {
            const dadosAtualizados = await editarInformacoesUsuario(id, informacoesAtualizadas)
            if(!dadosAtualizados) return retornoMessage.dadosNaoEncontrado(res, mensagens.usuarioNaoEncontrado)
    
            try {
                const informacaoAdmin = await buscarUsuarioEspecificoId(req.userId)
                this.cadastrarLogAdmin(id, { admin: req.userId, mensagem: `Administrador:${informacaoAdmin.nome} | editou as seguintes informações do usuário ${id} -> ${Object.keys(informacoesAtualizadas)}` })
                return retornoMessage.dadosSucesso(res, mensagens.dadosEditados)
            } catch (error) {
                console.log(error);
                return retornoMessage.errorNoServidor(res, error)
            }
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
}

module.exports = new Admin()