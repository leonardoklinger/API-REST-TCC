const { Router } = require("express")
const { compiladorResult, registrar, login } = require("../controllers")
const { VerificarToken } = require("../middleware/Usuario.middleware")

const router = Router()

router.post("/login", login)
router.post("/registrar", registrar)
router.post("/compilador", VerificarToken, compiladorResult)

module.exports = {
    router
}