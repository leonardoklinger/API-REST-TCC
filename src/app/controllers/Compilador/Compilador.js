const { resMensagens } = require("../../services/util")
const { dadosSucesso, dadosNaoEncontrado } = new resMensagens()

class TabelaDaVerdade {
    constructor() {
        this.variaveis = []
        this.expressoes = []
    }

    resultado = (req, res) => {
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

            dadosSucesso(res, this.porcentagemDeAcertos(expressaoCorreta, variaveis, expressao))
        } catch (error) {
            res.status(500)
            throw new Error(error)
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

    montarTabelaDaVerdade = (copiaVariavel, expressions, rows) => {
        this.variaveis = []
        this.expressoes = []

        for (const row of rows) {
          const cell = c => (row[c]?'T':'F')
          this.variaveis.push(...copiaVariavel.map(cell))
          this.expressoes.push(...expressions.map(cell))
        }

        return { variaveis: this.variaveis, expressoes: this.expressoes }
    }

    porcentagemDeAcertos = (expressaoCorreta, variaveis, expressaoUsuario) => {
        const resultadoCorreto = this.compilador(variaveis, expressaoCorreta)
        const resultadoUsuario = this.compilador(variaveis, expressaoUsuario)
        return Object.assign({}, resultadoUsuario, this.calcularPorcentagemDeAcerto(resultadoCorreto, resultadoUsuario, expressaoUsuario, expressaoCorreta))
    }

    calcularPorcentagemDeAcerto = (resultadoUser, resultadoCorreto, expressaoUsuario, expressaoCorreta) => {
        let pontuacaoExpressao = 0
        let pontuacaoVariaveis = 0

        resultadoUser.expressoes.forEach((resultado, index) => {
            if(resultado === resultadoCorreto.expressoes[index]) {
                pontuacaoExpressao++
            }
        })

        resultadoUser.variaveis.forEach((resultado, index) => {
            if(resultado === resultadoCorreto.variaveis[index]) {
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

        return { porcentagemDeAcertosUsuario: Math.round((pontuacaoExpressao + pontuacaoVariaveis + pontuacaoTotalFeitaUsuario) * 100 / (resultadoCorreto.expressoes.length + resultadoCorreto.variaveis.length + pontuacaoExpressaoCorreta.length)) }
    }
}

module.exports = new TabelaDaVerdade()