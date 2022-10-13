const launcher = require("./launch.json")
const { config } = require("./envs")
const fs = require("fs")

class startConfig {
    procurarArquivo() {
        const verificarArquivo = fs.readdirSync("./src/config/Ambiente/").filter(file => file.endsWith('.js'))
        if (!verificarArquivo.includes("envs.js")) return false
        return true
    }

    conectar() {
        if (this.procurarArquivo()) {
            return config[launcher.env.environment]
        }
        return console.log("Sistema de variaveis de ambientes não está funcionando ❌")
    }
}

module.exports = new startConfig().conectar()