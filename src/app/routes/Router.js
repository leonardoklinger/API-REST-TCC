const { Router } = require("express")
const { 
    resultado, 
    registrar, 
    login, 
    resetarSenha,
     gerarUrl, 
     cadastrarPontuacao, 
     pontuacao, 
     top10Usuarios,
     rankUsuarioEspecifico,
     criarNivel, 
     buscarNivelEspecifico, 
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
    } = require("../controllers")
const { VerificarToken, VerificarPermissao } = require("../middleware/Usuario.middleware")

const router = Router()
router.post("/login", login)
router.post("/registrar", registrar)
router.get("/resetarSenha", gerarUrl)
router.put("/resetarSenha/:token", resetarSenha)
router.post("/compilador", VerificarToken, resultado)
router.get("/pontuacao", VerificarToken, pontuacao)
router.post("/pontuacao", VerificarToken, cadastrarPontuacao)
router.get("/top10rank", VerificarToken, top10Usuarios)
router.get("/rankusuario/:idUser", VerificarToken, rankUsuarioEspecifico)
router.post("/criarNivel", VerificarToken, criarNivel)
router.get("/buscarNivelEspecifico", VerificarToken, buscarNivelEspecifico)
router.get("/buscarTodosNiveis", VerificarToken, buscarTodosNiveis)
router.get("/buscarNivelPorDificuldade", VerificarToken, buscarNivelPorDificuldade)
router.get("/buscarUsuarioPorId", VerificarToken, buscarUsuarioPorId)
router.get("/checkarConta", VerificarToken, checkarConta)

//Administrador
router.get("/buscarTodosNiveisParaSerAprovados", VerificarPermissao, buscarTodosNiveisParaSerAprovados)
router.get("/buscarUsuario", VerificarPermissao, buscarUsuarioEspecifico)
router.delete("/excluirContaUsuario", VerificarPermissao, excluirContaUsuarioEspecifico)
router.put("/aprovarNivelUsuario", VerificarPermissao, aprovarNivel)
router.put("/naoAprovarNivelUsuario", VerificarPermissao, naoAprovarNivelUsuario)
router.put("/editarInformacoesUsuario", VerificarPermissao, editarInformacoesUsuario)

module.exports = {
    router
}