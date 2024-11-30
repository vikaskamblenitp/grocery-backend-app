<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://plus.unsplash.com/premium_photo-1681487980150-63e4ab2ee584?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project logo"></a>
</p>

<h3 align="center">Grocery Backend Application</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/vikaskamblenitp/qp-assessment/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A simple grocery backend project
    <br> 
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
  - [Prerequisites](#prerequisites)
  - [Setup env](#setup-env)
  - [Installing](#installing)
  - [Create or run SQL migration scripts](#create-or-run-sql-migration-scripts)
- [🎈 Usage ](#-usage-)
  - [Public APIs](#public-apis)
  - [Admin APIs](#admin-apis)
  - [Users APIs](#users-apis)
- [🚀 Deployment ](#-deployment-)
  - [Docker Commands](#docker-commands)
- [⛏️ Built Using ](#️-built-using-)
- [Design Patterns used](#design-patterns-used)
- [✍️ Authors ](#️-authors-)

## 🧐 About <a name = "about"></a>


This project is a backend application for managing grocery items, designed as part of the Question Pro assessment. It showcases the ability to build a full-featured CRUD system using modern technologies like Node.js, Express, TypeScript, PostgreSQL, and Prisma. The goal of the application is to demonstrate proficiency in backend development, database integration, and the use of TypeScript for building robust, type-safe applications.

The application allows Admin to create, read, update, delete grocery items and manage inventory levels of grocery items efficiently and Allows user to view grocery items and book an order. By leveraging Prisma as an ORM, the system ensures seamless interaction with the PostgreSQL database, while the modular structure of Express and TypeScript ensures scalability and maintainability. This project serves as a practical demonstration of software engineering skills and adherence to best practices in backend development.

Though it is a simple project and microservice architecture for scalability wasn't taken taken into consideration as it is out of scope for this project.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
clone first: git clone https://github.com/vikaskamblenitp/qp-assessment.git

install dependencies: npm i
```

### Setup env
```
cp .env.example .env.local
cp .env.example .env
- Set right values environment values in both files. As a practice, we use .env.local for local environment and .env for production environment.
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Run Docker Compose using Make or docker-compose
```
make up
OR
docker compose up -d
```

Set up environment files
```
.env.local -> for local development
```
Apply database migrations
```
npm run migrate:up
```

Generate Prisma client and also sync with the db. following cmd will do that
```
npm run prisma:up
```

Start the application
```
npm run dev
```

### Create or run SQL migration scripts

```bash
# Create mirgration script
npm run migrate:create <migration-name>

# Spin up all sql migrations: migrate up
npm run migrate:up

# NOTE: migrate-up might not work if you have a dirty database, to reset it, run:
npm run migrate:reset
```

Refer `package.json` for more npm scripts

## 🎈 Usage <a name="usage"></a>

This project contains two type of users. ie. Admin & End user

Admin credentials
```
email - vikasmkamble007@gmail.com
password - QuestionPro@123
```
### Public APIs
```bash
# Login
http://localhost:3000/api/v1/users/login
# body
{
  "email": <email>,
  "password": <password>
}

# register user
http://localhost:3000/api/v1/users/create

# body
{
  "first_name": <first name>,
  "last_name": <last name>,
  "email": <email>,
  "password": <password>"
}
```

### Admin APIs
```bash
# Add Grocery Item
http://localhost:3000/api/v1/grocery-items

# body as following
{
    "name": "Chilli",
    "description": "The best chilli",
    "price": 25,
    "quantity": 1000
}

# View Grocery Items
http://localhost:3000/api/v1/grocery-items?page=1&limit=10&status=ACTIVE

# View Grocery Item
http://localhost:3000/api/v1/grocery-items/:itemID

# Update Grocery Item
http://localhost:3000/api/v1/grocery-items/:itemID

# body with all optional
{
  name: <name>,
  price: <price>,
  description: <description-goes-here>,
  status: <"ACTIVE" | "INACTIVE" |"DELETED" | "OUT_OF_STOCK">
}

# Manage Inventory Levels
http://localhost:3002/api/v1/grocery-items/:itemID/manage-stock

# body
{
    "quantity": 10,
    "action": <"decrease" | "increase">
}

```

### Users APIs
```bash
# View Grocery Items (Only returns ACTIVE Grocery Items)
http://localhost:3000/api/v1/grocery-items

# Book Order
http://localhost:3000/api/v1/orders
# body
{
    "items": [
        { "itemId": <itemID1>, "quantity": 2 },
        { "itemId": <itemID2>, "quantity": 1 }
    ]
}
```


## 🚀 Deployment <a name = "deployment"></a>

Can be deployed using K8S.
### Docker Commands
Build image 
```
Docker build -t question-pro .
```

Run Container in interactive mode
```
Docker run -it -e <path to .env> -p 3001:3000 question-pro
```

Run Container in detach mode
```
Docker run -d -e <path to .env> -p 3001:3000 question-pro
```

## ⛏️ Built Using <a name = "built_using"></a>

- [PostgreSQL](https://www.postgresql.org/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Typescript](https://www.typescriptlang.org/) - Language
- [Prisma](https://www.prisma.io/) - ORM Tool

## Design Patterns used
- Repository Pattern

## ✍️ Authors <a name = "authors"></a>

- [@vikaskamblenitp](https://github.com/vikaskamblenitp) - Sr. Fullstack Software Engineer @Winjit
