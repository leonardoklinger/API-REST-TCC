const { resultado } = require("./Compilador/Compilador")
const { registrar } = require("./Usuario/Conta/Register")
const { login } = require("./Usuario/Conta/Login")
const { resetarSenha, gerarUrl } = require("./Usuario/Conta/RestarSenha")
const { cadastrarPontuacao, pontuacao } = require("./Usuario/Perfil/Pontuacao")
const { top10Usuarios, rankUsuarioEspecifico } = require("./Usuario/Perfil/Rank")
const { buscarNivelEspecifico, criarNivel, buscarTodosNiveis, buscarNivelPorDificuldade, buscarTodosNiveisParaSerAprovados, aprovarNivel } = require("./Niveis/Nivel")
const { buscarUsuarioEspecifico, excluirContaUsuarioEspecifico, editarInformacoesUsuario } = require("./Administrador/usuario")

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
    editarInformacoesUsuario
}