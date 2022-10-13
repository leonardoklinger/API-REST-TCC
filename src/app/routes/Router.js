const { Router } = require("express")
const { compiladorResult, registrar, login, resetarSenha, gerarUrl, cadastrarPontuacao, pontuacao } = require("../controllers")
const { VerificarToken } = require("../middleware/Usuario.middleware")

const router = Router()

router.post("/login", login)
router.post("/registrar", registrar)
router.get("/resetarSenha", gerarUrl)
router.put("/resetarSenha/:token", resetarSenha)
router.post("/compilador", VerificarToken, compiladorResult)
router.get("/pontuacao/:idUser", VerificarToken, pontuacao)
router.post("/pontuacao", VerificarToken, cadastrarPontuacao)

module.exports = {
    router
}