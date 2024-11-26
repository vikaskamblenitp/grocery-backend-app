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
  - [Installing](#installing)
- [🎈 Usage ](#-usage-)
- [🚀 Deployment ](#-deployment-)
- [⛏️ Built Using ](#️-built-using-)
- [Design Patterns used](#design-patterns-used)
- [✍️ Authors ](#️-authors-)

## 🧐 About <a name = "about"></a>


This project is a backend application for managing grocery items, designed as part of the Question Pro assessment. It showcases the ability to build a full-featured CRUD system using modern technologies like Node.js, Express, TypeScript, PostgreSQL, and Prisma. The goal of the application is to demonstrate proficiency in backend development, database integration, and the use of TypeScript for building robust, type-safe applications.

The application allows Admin to create, read, update, delete grocery items and manage inventory levels of grocery items efficiently. By leveraging Prisma as an ORM, the system ensures seamless interaction with the PostgreSQL database, while the modular structure of Express and TypeScript ensures scalability and maintainability. This project serves as a practical demonstration of software engineering skills and adherence to best practices in backend development.

Though it is a simple project and microservice architecture for scalability wasn't taken taken into consideration as it is out of scope for this project.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
clone first: git clone https://github.com/vikaskamblenitp/qp-assessment.git

install dependencies: npm i
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

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

Can be deployed using K8S.

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
