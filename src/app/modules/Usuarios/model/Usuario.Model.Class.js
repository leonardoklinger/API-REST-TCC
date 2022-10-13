class UsuarioModelClass {
    validacoes(nome, email, senha, confirmarSenha, mensagens) {
        let mensagemRetorno = null

        if (!nome) {
            return mensagemRetorno = mensagens.nome
        }

        if (!email) {
            return mensagemRetorno = mensagens.email
        }

        if (!senha) {
            return mensagemRetorno = mensagens.senha
        }

        if (senha !== confirmarSenha && typeof confirmarSenha !== "string" != true) {
            return mensagemRetorno = mensagens.senhaDiferentes
        }

        return mensagemRetorno
    }
}

module.exports = {
    UsuarioModelClass
}