const config = {
    prod: {
        URL_MONGODB: process.env.URL_MONGODB,
        SECRET: process.env.SECRET,
        HOST_EMAIL: process.env.HOST_EMAIL,
        EMAIL_EMAIL: process.env.EMAIL_EMAIL,
        SENHA_EMAIL: process.env.SENHA_EMAIL,
        MONGODB_MENSAGEM: "MongoDB producao conectado com sucesso ✅"
    },
    dev: {
        URL_MONGODB: `mongodb://${process.env.DB_HOSTNAME}/${process.env.DB_PORT}`,
        SECRET: process.env.SECRET,
        HOST_EMAIL: process.env.HOST_EMAIL,
        EMAIL_EMAIL: process.env.EMAIL_EMAIL,
        SENHA_EMAIL: process.env.SENHA_EMAIL,
        MONGODB_MENSAGEM: "MongoDB desenvolvimento conectado com sucesso ✅"
    }
}

module.exports = {
    config
}