const { Router } = require("express")
const { compiladorResult, registrar, login, resetarSenha, gerarUrl } = require("../controllers")
const { VerificarToken } = require("../middleware/Usuario.middleware")

const router = Router()

router.post("/login", login)
router.post("/registrar", registrar)
router.post("/compilador", VerificarToken, compiladorResult)
router.get("/resetarSenha", gerarUrl)
router.put("/resetarSenha/:token", resetarSenha)

module.exports = {
    router
}