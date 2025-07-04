
Este projeto é composto por um **backend NestJS** e um **frontend Vite React**, preparados para rodar em ambiente Docker Compose com **PostgreSQL**.  
Ele gerencia pagamentos via PIX e está pronto para execução automatizada com migrations e integração frontend-backend.

---

## ⚡ Requisitos

- Docker
- Docker Compose
- (Opcional) Node 20+ e Yarn, caso queira rodar fora do Docker

---

## 🚀 Como iniciar o projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/igormpb/connect-digital
cd connect-digital
````

### 2️⃣ O arquivo `.env` já está criado na raiz do projeto com o seguinte conteúdo:

```env
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=connectdb
BACKEND_PORT=3000
FRONTEND_PORT=5173
```

### 3️⃣ Suba o projeto com Docker Compose

```bash
docker compose up --build -d
```

Isso irá:

* Criar e iniciar o banco de dados
* Rodar automaticamente as migrations
* Levantar o backend NestJS
* Levantar o frontend Vite (React)

### 4️⃣ Acesse no navegador

* Frontend (React + Vite): [http://localhost:3001](http://localhost:3001)
* Backend (NestJS API): [http://localhost:3000](http://localhost:3000)

---

## 🔄 Como resetar completamente o ambiente

Caso precise limpar tudo e rebuildar do zero, execute:

```bash
docker compose down --volumes
docker compose up --build -d
```

---

## 📬 Postman

Um arquivo **Postman Collection** está incluído no projeto:

* Arquivo: `postman_collection.json`

Importe no Postman para testar os principais endpoints da API.

---

## ⚙ Estrutura do projeto

```
/
├── backend/
│   └── NestJS app
├── frontend/
│   └── Vite + React app
├── docker-compose.yml
├── .env
├── README.md
└── postman_collection.json
```

---

## 📌 Notas importantes

* O backend roda as migrations automaticamente ao iniciar (`migrationsRun: true`).
* O frontend se comunica com o backend pelo nome do container via rede Docker.
* O projeto está preparado para fácil execução e avaliação.
* Caso queira limpar tudo antes de rebuildar:

```bash
docker compose down --volumes
docker compose up --build -d
```
