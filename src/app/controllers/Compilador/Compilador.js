const { dadosNaoEncontrado } = require("../../services/util")

class TabelaDaVerdade {
    dados = (req, res) => {
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

        res.status(200).json(this.dadosFinaisComPorcentagemDeAcertos(expressaoCorreta, expressao, variaveis))
    }

    dadosFinaisComPorcentagemDeAcertos(expressaoCorreta, expressao, variaveis) {
        let arrayNivelAtualizado = this.compilador(expressaoCorreta, variaveis)
        return this.resultadoPorcentagemDeAcertos(arrayNivelAtualizado, this.compilador(expressao, variaveis))
    }

    compilador(expressao, variaveis) {
        let expressaoArray = expressao.split(","),
            variaveisArray = variaveis.split(",")

        var variaveisArrumadas,
            arrayVerdadeiras = [],
            proposicoesData = []

        proposicoesData.push(this.proposicoes(variaveisArray, variaveisArray, true))
        for (var i = 1; i <= Math.round(variaveisArray.length / 2); i++) {
            variaveisArrumadas = this.possiveisCombinacoes(variaveisArray, i)
            variaveisArrumadas.forEach((proposicoesSrc) => {
                arrayVerdadeiras = this.proposicoes(variaveisArray, proposicoesSrc)
                proposicoesData.push(arrayVerdadeiras)
            });
        }

        proposicoesData.push(this.proposicoes(variaveisArray, variaveisArray))
        return this.construcaoMatrizTabelaDaVerdade(proposicoesData, variaveisArray, expressaoArray)
    }

    proposicoes(variaveis, tabelaVerdade, reverter) {
        var w = {};
        variaveis.forEach(v => w[v] = (tabelaVerdade.indexOf(v) >= 0 ? true : false) ^ reverter);
        return w;
    }

    possiveisCombinacoes(variaveis, i) {
        let combinations = [];
        if (i <= 1) {
            return variaveis
        } else {
            for (let i = 0; i < variaveis.length; ++i) {
                for (let j = i + 1; j < variaveis.length; ++j) {
                    combinations.push([variaveis[i], variaveis[j]]);
                }
            }
        }
        return combinations
    }

    construcaoMatrizTabelaDaVerdade(proposicoesData, variaveis, expressao) {
        let resultadoExpressao = []
        proposicoesData.forEach((v) => {
            let i = 0
            let valores = [];
            let variaveisReformulada = [];

            for (i in v) {
                valores.push(v[i]);
                variaveisReformulada.push(i);
            };

            resultado(variaveisReformulada, valores, expressao, resultadoExpressao)
        })

        return { proposicoesTable: proposicoesData, variaveisTable: variaveis, expressaoTable: expressao, resultadoExpressaoTable: resultadoExpressao }
    }

    resultadoPorcentagemDeAcertos(repostaCorreta, objeto) {
        let valor = 0
        objeto.resultadoExpressaoTable.forEach((element, index) => {
            if (element === repostaCorreta.resultadoExpressaoTable[index]) {
                valor++
            }
        });
        return Object.assign({}, objeto, { porcentagemDeAcertos: Math.round(valor * 100 / repostaCorreta.resultadoExpressaoTable.length) })
    }
}

function resultado(variaveisReformulada, valores, expressao, resultadoExpressao) { //Tiver que utilizar por conta que o eval não era reconhecido na metodo class !
    for (var i = 0; i < variaveisReformulada.length; i++) {
        eval(`var ${variaveisReformulada[i]} = ${valores[i]};`)
    }

    expressao.forEach((v) => {
        resultadoExpressao.push(eval(v) == 1 ? "V" : "F")
    })
}

module.exports = new TabelaDaVerdade()