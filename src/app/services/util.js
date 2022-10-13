class resMensagens {

    dadosSucesso(res, message) {
        res.status(200).json(message)
    }

    cadastroSucesso(res, message) {
        res.status(201).json(message)
    }

    dadosSucessoSemRetorno(res, message) {
        res.status(204).json(message)
    }

    naoAutorizado(res, message) {
        res.status(401).json(message)
    }

    dadosNaoEncontrado(res, message) {
        res.status(404).json(message)
    }

    dadosNecessarios(res, message) {
        res.status(422).json(message)
    }

    errorNoServidor(res, message) {
        res.status(500).json(message)
    }
}

const mensagens = {
    emailUtilizado: "Por favor, utilize outro e-mail",
    userCriadoComSucesso: "Usuário criado com sucesso!",
    errorNoServidor: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    nome: "Por favor, informe um nome!",
    email: "Por favor, informe um e-mail!",
    emailInvalido: "Por favor, informe um e-mail valido!",
    emailNaoEncontrado: "E-mail não encontrado em nosso banco de dados!",
    senha: "Por favor, informe um senha!",
    senhaDiferentes: "Senha não coincidem!",
    resetSenha: "Foi enviado um e-mail com os passos para resetar sua senha!",
    confirmeSenha: "Por favor, confirme a senha!",
    emailObrigatorio: "O e-mail é obrigatório!",
    senhaObrigatoria: "O senha é obrigatória!",
    usuarioNaoEncontrado: "Usuário não encontrado!",
    senhaInvalida: "Senha inválida!",
    autenticacao: "Autenticação realizada com sucesso!",
    token: "Token inválido!",
    tokenVazio: "Por favor, informe um token!",
    tokenExpirado: "Token expirado!",
    parametros: "Por favor, verificar parametros!",
    informeUmLevel: "Por favor, informe um level!",
    informePorcentagemDeAcertos: "Por favor, informe a porcentagem de acertos!",
    idUser: "Por favor, informe o id do usuário!",
    usuarioSemPontuacao: "Usuário não tem nenhuma pontuação!",
    idInformado: "Id informado é inválido!",
    pontuacaoAtualizada: "Pontuação atualizada com sucesso"
}

module.exports = { resMensagens, mensagens }