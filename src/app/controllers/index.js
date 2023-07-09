const { resultado } = require("./Compilador/Compilador")
const { registrar } = require("./Usuario/Conta/Register")
const { login } = require("./Usuario/Conta/Login")
const { checkarConta } = require("./Usuario/Conta/Conta")
const { resetarSenha, gerarUrl } = require("./Usuario/Conta/RestarSenha")
const { cadastrarPontuacao, pontuacao } = require("./Usuario/Perfil/Pontuacao")
const { top10Usuarios, rankUsuarioEspecifico } = require("./Usuario/Perfil/Rank")
const { buscarNivelEspecifico, criarNivel, buscarTodosNiveis, buscarNivelPorDificuldade, buscarTodosNiveisParaSerAprovados, aprovarNivel, naoAprovarNivelUsuario } = require("./Niveis/Nivel")
const { buscarUsuarioEspecifico, excluirContaUsuarioEspecifico, editarInformacoesUsuario, buscarUsuarioPorId } = require("./Administrador/usuario")

module.exports = {
    resultado,
    registrar,
    login,
    resetarSenha,
    gerarUrl,
    cadastrarPontuacao,
    pontuacao,
    top10Usuarios,
    rankUsuarioEspecifico,
    buscarNivelEspecifico,
    criarNivel,
    buscarTodosNiveis,
    buscarNivelPorDificuldade,
    buscarUsuarioEspecifico,
    excluirContaUsuarioEspecifico,
    buscarTodosNiveisParaSerAprovados,
    aprovarNivel,
    naoAprovarNivelUsuario,
    editarInformacoesUsuario,
    buscarUsuarioPorId,
    checkarConta
}