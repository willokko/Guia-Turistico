# Guia Turístico da Paraíba

Este projeto é uma atividade da disciplina de **Script** do curso de Análise e Desenvolvimento de Sistemas (ADS). Ele consiste na criação de um guia turístico interativo das belezas da Paraíba, utilizando conceitos de **assicronismo, Fetch API e requisições HTTP**.

## Funcionalidades
- **Criar local:** Permite adicionar um novo local ao guia turístico.
- **Listar locais:** Exibe todos os locais cadastrados, incluindo título, descrição e imagem.
- **Editar local:** Possibilita modificar os detalhes de um local existente.
- **Excluir local:** Permite remover um local previamente cadastrado.

## Tecnologias Utilizadas
- **Frontend:** HTML, CSS e JavaScript.
- **Estilização:** Bootstrap.
- **Backend Simulado:** JSON Server.
- **Requisições HTTP:** Fetch API.

## Como Executar o Projeto
### 1. Instalar Dependências
Certifique-se de ter o **Node.js** instalado e execute o seguinte comando para instalar o JSON Server:
```sh
npm install -g json-server
```

### 2. Iniciar o Servidor JSON
Baixe o arquivo `locais.json` e execute o seguinte comando no diretório do projeto:
```sh
json-server locais.json --port 3000
```
O servidor será iniciado na porta 3000.

### 3. Abrir a Interface
Abra o arquivo `index.html` em um navegador para interagir com a aplicação.

## Estrutura do Projeto
```
/
|-- index.html       # Estrutura da página principal
|-- styles.css       # Estilização do site
|-- script.js        # Lógica de interação com a API
|-- locais.json      # Banco de dados simulado (JSON Server)
```

## Autor
Este projeto foi desenvolvido como parte da disciplina de Script no curso de Análise e Desenvolvimento de Sistemas.

