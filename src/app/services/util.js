const dadosOk = (res, message) => {
    res.status(200).json({ mensagem: message })
}

const invalido = (res, message) => {
    res.status(401).json({ mensagem: message })
}

const dadosNaoEncontrado = (res, message) => {
    res.status(404).json({ mensagem: message })
}

const dadosNecessarios = (res, message) => {
    res.status(422).json({ mensagem: message })
}

const errorServidor = (res, message) => {
    res.status(500).json({ mensagem: message })
}

const mensagens = {
    emailUtilizado: "Por favor, utilize outro e-mail",
    userCriadoComSucesso: "Usuário criado com sucesso!",
    errorNoServidor: "Aconteceu um erro no servidor, tente novamente mais tarde!",
    nome: "Por favor, informe um nome!",
    email: "Por favor, informe um e-mail!",
    senha: "Por favor, informe um senha!",
    senhaDiferentes: "Senha não coincidem!",
    emailObrigatorio: "O e-mail é obrigatório!",
    senhaObrigatoria: "O senha é obrigatória!",
    usuarioNaoEncontrado: "Usuário não encontrado!",
    senhaInvalida: "Senha inválida!",
    autenticacao: "Autenticação realizada com sucesso!",
    token: "Token inválido!",
    tokenVazio: "Por favor, informe um token!"
}

module.exports = {
    dadosNaoEncontrado,
    errorServidor,
    mensagens,
    dadosOk,
    dadosNecessarios,
    invalido
}