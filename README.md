# Projeto TCC (Back-end)
- Este trabalho tem como objetivo apresentar o desenvolvimento de um jogo que possa ser utilizado para auxiliar no aprendizado de lógica proposicional. Neste sentido, este projeto propõe o desenvolvimento de um jogo de lógica proposicional para **WEB**, seguindo o gênero de games **puzzle**, onde será possível construir uma proposição lógica, a partir da interpretação de um texto, utilizando conectivos de negação, conjunção, disjunção e implicação, e elaborar a tabela-verdade da proposição.

## Tecnologias utilizadas (Não foram todas utilizadas!)

<div style="display: inline_block"><br/>
    <img align="center" alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img align="center" alt="Nodejs" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
    <img align="center" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
    <img align="center" alt="NPM" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
    <img align="center" alt="Redis" src="https://img.shields.io/badge/Redis-D9281A?style=for-the-badge&logo=redis&logoColor=white" />
    <img align="center" alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />
    <img align="center" alt="ApiRest" src="https://img.shields.io/badge/API%20REST-B50BEC?style=for-the-badge&logo=apirest&logoColor=white" />
</div><br/>

## Platorma
<div style="display: inline_block"><br/>
    <img align="center" alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
</div><br/>

## IDE
<div style="display: inline_block"><br/>
    <img align="center" alt="Visual Studio Code" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />
</div><br/>

## Pré-requisitos
  * NPM
  * NodeJs
  * Redis
  * MongoDB

## Features
- [x] Gerador tabela da verdade (Compilador)
- [x] Mensagens de erro (Padrão Api Rest)
- [x] Implementações
 + Controllers
   - [x] Compilador
      - [x] Gerar tabela da verdade
      - [x] Porcentagem de acertos
   - [ ] Usuários
      - [ ] Login
        * JWT
      - [ ] Cadastro
        * JWT
      - [ ] Perfil
        * Redis
   - [ ] Dashboard
      - [ ] Top Ranks
        * Redis
      - [ ] Posição atual
        * Redis
   - [x] Routes
      - [x] Compilador
      - [ ] Login
      - [ ] Cadastro
      - [ ] Perfil
      - [ ] Status
      - [ ] Dashboard
      - [ ] Top Ranks
      - [ ] Posição atual
   - [x] Services
      - [ ] Redis
         * Models
         * Connection
         * Cache
      - [x] Util
         * Erros
      - [ ] MongoDB
         * Models
         * Connection
   - [x] Config
      - [x] App
      - [ ] Redis
      - [ ] MongoDB
      
## Bibliotecas
  - [x] Cors
  - [ ] DotEnv
  - [ ] IoRedis
  - [x] Express
  - [ ] Mongoose
  - [ ] Body-parser
  - [ ] JsonWebToken
  
 ## Instalação
 1) Clone o projeto: 
      ~~~
      git clone git@github.com:leonardoklinger/API-REST-TCC.git
      ~~~
      ou
      ~~~
      git clone https://github.com/leonardoklinger/API-REST-TCC.git
      ~~~
      
2) Instalar pacotes:
      ~~~npm
      npm install
      ~~~
 
## Executar API
1) Executar o projeto:

      ~~~
      npm install
      ~~~
      ou
      ~~~
      node .\src\
      ~~~

2) Urls:
    * http://localhost:3000/compilador
