const mongoose = require("mongoose")
const { URL_MONGODB, DB_PORT } = process.env
//const MONGO_DB_URL = `mongodb://${DB_HOSTNAME}/${DB_PORT}`

class conexaoMongoDB {
    conectar() {
        mongoose.connect(URL_MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log("MongoDB conectado com sucesso"))
            .catch((error) => console.error(error))
    }
}

module.exports = new conexaoMongoDB()