const { server } = require("./config/app")
const conexaoBancoDeDados = require("./app/services/DB/Conexao")
require("dotenv").config()

conexaoBancoDeDados()

server.listen(3000, () => {
    console.log(`Api ligada com sucesso na porta 3000`)
})