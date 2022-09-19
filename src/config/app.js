const bodyParser = require("body-parser")
const express = require("express")
const { router } = require("../app/routes/Router")
const cors = require("cors")

class App {
    constructor() {
        this.server = express()
        this.middleware()
        this.router()
    }

    middleware() {//Transforma todos os resultados da api em JSON
        this.server.use(bodyParser.json())
        this.server.use(cors())
    }

    router() {
        this.server.use(router)
    }
}

module.exports = new App()