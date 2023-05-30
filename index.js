require("dotenv").config()
require("./src/config/DB/Conexao.config").conectar()
const { server } = require("./src/config/app")
const port = process.env.PORT || 3000
const cors = require("cors")
server.use(cors())

server.listen(port, () => {
    console.log(`Api ligada com sucesso na porta ${port} ✅`)
})