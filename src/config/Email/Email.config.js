const nodemailer = require("nodemailer")
const variaveis = require("../../config/Ambiente/start")

class EmailServices {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: variaveis.HOST_EMAIL,
            port: variaveis.PORT_EMAIL,
            secure: true,
            auth: {
                user: variaveis.EMAIL_EMAIL,
                pass: variaveis.SENHA_EMAIL
            }
        })
    }
}

module.exports = new EmailServices()