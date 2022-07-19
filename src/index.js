const { server } = require("./config/app")

server.listen(3000, () => {
    console.log(`Api ligada com sucesso na porta 3000`)
})