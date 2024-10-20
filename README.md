
# Eletricity

Projeto para visualizar dados de faturas de energia elétrica a partir de um painel.

- [Eletricity](#Eletricity)
  - [Tecnologias](#tecnologias)
  - [Inicializando](#inicializando)
    - [Server](#server)
    - [Client](#client)

## Tecnologias

Para o desenvolvimento deste projeto, foi utilizado as seguintes tecnologias:

- [Node](https://nodejs.org/en/);
- [Express](https://expressjs.com/pt-br/);
- [TypeScript](https://www.typescriptlang.org/);
- [pdf-parse](https://www.npmjs.com/package/pdf-parse);
- [Prisma](https://www.prisma.io/);
- [PostgreSQL](https://www.postgresql.org/);
- [Docker](https://www.docker.com/).

## Inicializando

## Server
### Banco de dados
#### Executando o container do banco de dados
O banco de dados do projeto foi construido de estrutura de contêineres com o Docker. E para iniciar o banco de dados, rode os seguintes comandos:

```bash
$ cd server/database
$ docker-compose up -d
```

### Backend
O backend foi construido com Nodejs, Prisma, Express, utilizando o template typescript. Primeiramente vamos instalar as dependências através do seguinte comando:

```bash
$ cd server
$ npm install
```

agora na raiz do server crie um arquivo `.env` com o seguinte conteúdo:

```
  DATABASE_URL="postgresql://user123:senha123@localhost:5432/electricityExtractorDB?schema=public"
```

sendo o usuario, senha e o banco de dados definidos no nosso banco de dados. E em seguida podemos configurar o nosso Prisma e criar as tabelas no banco de dados:
  
```bash
$ npx prisma migrate dev --name init
$ npx prisma generate
```

#### Extrair dados das faturas:

Observação: deve ser criada uma pasta chamada `data` dentro de `server/extractedData`, e nele você vai alimentar com os pdf das faturas, para o padrão de faturas utilizado de base deve funcionar perfeitamente a extração de dados.

Para extrairmos os dados das faturas de eletricidade precisa roda apenas o seguinte comando:

```bash
$ npm run extract
```

E por fim podemos preencher o banco de dados:

```bash
$ npm run seed:faturas 
```

Por fim podemos inicializar a nosso server:

```bash
$ npm run dev
```

## Client
O frontend foi construido com React, React-router-dom, styled-components, react-icons, chart.js  utilizando o template typescript. Primeiramente vamos instalar as dependências através do seguinte comando:

```bash
$ cd client
$ npm install
```

agora na raiz do client crie um arquivo `.env` com o seguinte conteúdo:

```
  VITE_APP_BASE_URL_API=http://localhost:3000
```

Por fim podemos inicializar a nosso client:

```bash
$ npm run dev
```

### Executando a aplicação

Agora com a aplicação configurada é possível acessa-la através da seguinte URL para ver se esta tudo certo:

- http://localhost:5173

E poderá acessar a API em:
- http://localhost:3000
