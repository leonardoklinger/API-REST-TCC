const { Router } = require("express")
const { dados } = require("../controllers")

const router = Router()

router.post("/compilador", dados)

module.exports = {
    router
}