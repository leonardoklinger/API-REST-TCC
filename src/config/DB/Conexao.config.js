const mongoose = require("mongoose")
const variaveis = require("../Ambiente/start")

class conexaoMongoDB {
    conectar() {
        mongoose.connect(variaveis.URL_MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log(variaveis.MONGODB_MENSAGEM))
            .catch((error) => console.error(error))
    }
}

module.exports = new conexaoMongoDB()