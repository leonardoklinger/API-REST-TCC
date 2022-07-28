const mongoose = require("mongoose")

const conexaoBancoDeDados = () => {
    mongoose.connect(process.env.URL_MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("MongoDB conectado com sucesso"))
    .catch((error) => console.error(error))
}

module.exports = conexaoBancoDeDados