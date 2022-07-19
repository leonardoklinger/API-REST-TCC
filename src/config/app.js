const express = require("express")
const { router } = require("../app/routes/Router")

class App {
    constructor() {
        this.server = express()
        this.middleware()
        this.router()
    }

    middleware() {//Transforma todos os resultados da api em JSON
        this.server.use(express.json())
    }

    router() {
        this.server.use(router)
    }
}

module.exports = new App()