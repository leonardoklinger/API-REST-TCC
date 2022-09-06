const mongoose = require("mongoose")
const { DB_HOSTNAME, DB_PORT } = process.env
const MONGO_DB_URL = `mongodb://${DB_HOSTNAME}/${DB_PORT}`

class conexaoMongoDB {
    conectar() {
        mongoose.connect(MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log("MongoDB conectado com sucesso"))
            .catch((error) => console.error(error))
    }
}

module.exports = new conexaoMongoDB()