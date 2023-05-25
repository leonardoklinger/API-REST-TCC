const { resMensagens } = require("../../services/util")
const { dadosSucesso, dadosNaoEncontrado, errorNoServidor } = new resMensagens()

class TabelaDaVerdade {
    constructor() {
        this.variaveis = []
        this.expressoes = []
    }

    resultado = async (req, res) => {
        try {
            const { expressaoCorreta, expressao, variaveis } = req.body

            if (!expressaoCorreta) {
                return dadosNaoEncontrado(res, "Campo expressaoCorreta vazio!")
            }

            if (!expressao) {
                return dadosNaoEncontrado(res, "Campo expressao vazio!")
            }

            if (!variaveis) {
                return dadosNaoEncontrado(res, "Campo variaveis vazio!")
            }

            dadosSucesso(res, await this.porcentagemDeAcertos(expressaoCorreta, variaveis, expressao))
        } catch (error) {
            const mensagem = `Ops, deu algo de errado na compilação. ${error}`
            return errorNoServidor(res, { message: mensagem })
        }
    }

    compilador = (variaveis, expressao) => {
        let copiaVariavel = variaveis.slice()

        variaveis.forEach(variavel => {
            if(!(expressao.includes(variavel))) {
                copiaVariavel.splice(variaveis.indexOf(variavel), 1)
            }
        })

        const expressions = [expressao];
        const functionsByExpr = Object.fromEntries(expressions.map(expr =>
          [expr, new Function(...copiaVariavel, `return ${expr};`)]
        ));
        
        const rows = [];
        for (let i = 0; i < (1 << copiaVariavel.length); i++) {
          const entries = copiaVariavel.map((name, j) =>
            [name, (i >>> j) & 1 == 1]
          );
          const values = entries.map(e => e[1]);
          const obj = Object.fromEntries(entries);
          for (const expr of expressions) {
            obj[expr] = functionsByExpr[expr](...values);
          }
          rows.push(obj);
        }
        
        return this.montarTabelaDaVerdade(copiaVariavel, expressions, rows)
    }

    verificarExpressao(expressao) {//verificar se existe 2 expressoes uma do lado da outra.
        return new Promise((resolve, reject) => {
            let copiaExpressao = expressao
            const removerOperadoresLogicos = ["(", ")", "||", "&&", "~"]
    
            removerOperadoresLogicos.forEach(operadores => {
                copiaExpressao = copiaExpressao.replaceAll(operadores, ",")
            })
    
            const removerEspacoVazio = copiaExpressao.split(",").filter((i) => {
                return i
            });
    
            removerEspacoVazio.forEach(verificar => {
                if(verificar.length > 1) {
                    return reject()
                } else {
                    resolve()
                }
            })
        })
    }

    montarTabelaDaVerdade = (copiaVariavel, expressions, rows) => {
        this.variaveis = []
        this.expressoes = []

        for (const row of rows) {
          const cell = c => (row[c]?'T':'F')
          this.variaveis.push(...copiaVariavel.map(cell))
          this.expressoes.push(...expressions.map(cell))
        }

        return { resultado: this.variaveis, expressoes: this.expressoes, variaveis: copiaVariavel }
    }

    porcentagemDeAcertos = (expressaoCorreta, variaveis, expressaoUsuario) => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.verificarExpressao(expressaoUsuario)
                const resultadoCorreto = this.compilador(variaveis, expressaoCorreta)
                const resultadoUsuario = this.compilador(variaveis, expressaoUsuario)
                resolve(Object.assign({}, resultadoUsuario, this.calcularPorcentagemDeAcerto(resultadoCorreto, resultadoUsuario, expressaoUsuario, expressaoCorreta)))
            } catch (error) {
                reject("A sequência informada não pode conter duas variáveis seguidas!")
            }
        })
    }

    calcularPorcentagemDeAcerto = (resultadoUser, resultadoCorreto, expressaoUsuario, expressaoCorreta) => {
        let pontuacaoExpressao = 0
        let pontuacaoVariaveis = 0

        resultadoUser.expressoes.forEach((resultado, index) => {
            if(resultado === resultadoCorreto.expressoes[index]) {
                pontuacaoExpressao++
            }
        })

        resultadoUser.resultado.forEach((resultado, index) => {
            if(resultado === resultadoCorreto.resultado[index]) {
                pontuacaoVariaveis++
            }
        })

        const pontuacaoExpressaoCorreta = expressaoCorreta.split(" ")
        const pontuacaoExpressaoUsuario = expressaoUsuario.split(" ")
        let pontuacaoTotalFeitaUsuario = 0

        pontuacaoExpressaoCorreta.forEach((resultado, index) => {
            if(resultado === pontuacaoExpressaoUsuario[index]) {
                pontuacaoTotalFeitaUsuario++
            }
        })

        return { porcentagemDeAcertosUsuario: Math.round((pontuacaoExpressao + pontuacaoVariaveis + pontuacaoTotalFeitaUsuario) * 100 / (resultadoCorreto.expressoes.length + resultadoCorreto.resultado.length + pontuacaoExpressaoCorreta.length)) }
    }
}

module.exports = new TabelaDaVerdade()