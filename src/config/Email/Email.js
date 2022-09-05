const nodemailer = require("nodemailer")

class EmailServices {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.HOST_EMAIL,
            port: process.env.PORT_EMAIL,
            secure: true,
            auth: {
                user: process.env.EMAIL_EMAIL,
                pass: process.env.SENHA_EMAIL
            }
        })
    }
}

module.exports = new EmailServices()