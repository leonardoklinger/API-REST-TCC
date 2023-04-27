const { Router } = require("express")
const { resultado, registrar, login, resetarSenha, gerarUrl, cadastrarPontuacao, pontuacao, criarNivel, buscarNivelEspecifico, buscarTodosNiveis } = require("../controllers")
const { VerificarToken } = require("../middleware/Usuario.middleware")

const router = Router()
router.post("/login", login)
router.post("/registrar", registrar)
router.get("/resetarSenha", gerarUrl)
router.put("/resetarSenha/:token", resetarSenha)
router.post("/compilador", VerificarToken, resultado)
router.get("/pontuacao/:idUser", VerificarToken, pontuacao)
router.post("/pontuacao", VerificarToken, cadastrarPontuacao)
router.post("/criarNivel", VerificarToken, criarNivel)
router.get("/buscarNivelEspecifico", VerificarToken, buscarNivelEspecifico)
router.get("/buscarTodosNiveis", VerificarToken, buscarTodosNiveis)

module.exports = {
    router
}