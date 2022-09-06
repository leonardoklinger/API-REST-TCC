const { transporter } = require("../../../config/Email/Email.config")
const path = require("path")
const hbs = require("nodemailer-express-handlebars")


class Email {
    constructor() {
        this.emailServices = transporter
    }

    async enviadorEmail(emailDestino, template, token, titulo, texto) {
        let dados = {
            from: `Lógica proposicional <${process.env.EMAIL_EMAIL}>`,
            to: emailDestino,
            subject: titulo,
            template: template,
            context: {
                title: titulo,
                text: texto,
                token: token
            }
        }

        return new Promise((resolve, reject) => {
            transporter.use("compile", hbs({
                viewEngine: {
                    extName: ".handlebars",
                    partialsDir: path.resolve('./src/public/views'),
                    defaultLayout: false,
                },
                viewPath: path.resolve('./src/public/views'),
                extName: ".handlebars",
            }))



            transporter.sendMail(dados).then(dados => {
                resolve({
                    message: "E-mail enviado com sucesso",
                    dados: dados,
                    status: 200
                })
            }).catch(error => {
                reject({
                    message: "Erro ao enviar E-mail",
                    error,
                    status: 400
                })
            })
        })

    }
}

module.exports = new Email()