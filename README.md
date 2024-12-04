# FIAP Blog App

## Descrição

Este é o app de um blog escolar, desenvolvido como parte do desafio técnico da pós-graduação em Full Stack da FIAP. O projeto é destinado ao uso por professores e alunos.

## Experiência de Desenvolvimento

Durante o desenvolvimento, um dos principais desafios foi a integração com o backend e a configuração do ambiente de desenvolvimento utilizando Expo e suas rotas. A escolha do Expo como ferramenta de build e desenvolvimento se mostrou eficiente devido à sua rapidez e simplicidade. Além disso, a utilização de bibliotecas como React Native e Firebase facilitou a criação de uma interface de usuário moderna e responsiva e um backend e autenticação práticas.

## Arquitetura

O projeto segue uma arquitetura modular e escalável, utilizando as seguintes tecnologias e padrões:

- React Native: Biblioteca para construção de interfaces de apps.
- Expo: Ferramenta de build e desenvolvimento rápida para projetos mobile.
- TypeScript: Superset do JavaScript que adiciona tipagem estática ao código.
- Firebase: Plataforma para desenvolvimento de aplicativos móveis e web.
- Axios: Cliente HTTP para realizar requisições ao backend.
- Context API: Utilizado para gerenciamento de estado global da aplicação.

A estrutura do projeto é organizada da seguinte forma:

- src/: Contém todo o código fonte do projeto.
- components/: Contém os componentes reutilizáveis da interface de usuário.
- screens/: Contém as telas da aplicação.
- services/: Contém os serviços para comunicação com o backend.
- context/: Contém os contextos para gerenciamento de estado global.
- interfaces/: Contém as interfaces TypeScript utilizadas no projeto.
- app.json: Arquivo de configuração do Expo.
- tsconfig.json: Arquivo de configuração do TypeScript.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Ter o Node e npm instalados
- Ter uma IDE instalada como VsCode
- Ter o app do expo instalado no celular ou emuladores

## 🚀 Instalando FIAP Blog App

Para instalar o FIAP Blogging, siga estas etapas:

```bash
npm install
```

Após a instalação:

```bash
npx expo start
```

## ☕ Usando FIAP Blog App

Siga as etapas abaixo para aproveitar ao máximo o FIAP Blogging:

### Visualizando Posts

Ao acessar o app, a pagina principal será uma lista de posts. Para ler um post completo, clique em "ler mais..." no card do post. Assim, você poderá visualizar todo o conteúdo do post.

### Login

Para criar e editar posts, é necessário estar logado. Clique no ícone de login para realizar o login.

Preencha os campos necessários e clique em Entrar para realizar o login.

### Pesquisando posts

Na página principal, você pode utilizar o input de busca para encontrar posts, digitando palavras-chave do título. Os resultados aparecerão automaticamente.

### Criando posts

Após fazer login, 3 abas serão liberadas. São elas "Home", "Criar Post" e "Admin".

Para criar um novo post, clique no botão Criar Post.

### Editando posts

Para editar um post, vá na Home e clique no ícone de lápis para editar o post, ou clique em ler mais e depois no lápis, na página do post.

### Excluindo posts

Para excluir um post, vá na Home e clique no ícone de lixeira para excluir o post, ou clique em ler mais e depois na lixeira, na página do post.


### Informações de usuários

Na aba Admin, você pode visualizar e gerenciar as informações dos usuários da plataforma.

### Criando usuário

Clicando no botão Criar Novo Usuário, você conseguirá criar um novo usuário para acessar o app.
