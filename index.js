require("dotenv").config()
const { server } = require("./src/config/app")
const conexaoBancoDeDados = require("./src/config/DB/Conexao")
conexaoBancoDeDados()

try {
    server.listen(3000, () => {
        console.log(`Api ligada com sucesso na porta 3000`)
    })
} catch (error) {
    console.log(error)
}