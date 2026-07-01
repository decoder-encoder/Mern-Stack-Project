# Expense Tracker - Personal Finance Web Application

A full-stack personal finance web application built using the MERN stack. The platform serves as a centralized dashboard for users to securely log financial transactions, categorize income and expenditure, and monitor real-time budgetary limits.

## Technical Architecture Overview

The application is deployed as a unified project on Vercel's serverless infrastructure. The presentation layer (React) is served via Vercel's global edge network, while the backend API routes are executed dynamically as serverless functions. 

Data persistence is managed via cloud-hosted MongoDB Atlas, utilizing Mongoose for schema validation, data aggregation, and object modeling.

## Core Implementations and Feature Details

### 1. Security, Session Management, and Authentication
* Stateless Authentication: Implemented user authentication using JSON Web Tokens (JWT). Upon successful login, a token is issued and stored securely on the client side to authorize subsequent API requests.
* Cryptographic Hashing: Integrated the bcrypt library to execute salt-round hashing on user passwords before storage, ensuring that plaintext credentials are never written to the database.
* Route Guarding: Established private route middleware on the frontend and authorization checks on the backend to prevent unauthenticated access to user data.

### 2. RESTful API Design and Transaction Lifecycle
* CRUD Operations: Engineered Express routes to handle full Create, Read, Update, and Delete lifecycles for financial records (income and expenses).
* Data Modeling: Structured relational-like data models within MongoDB using user object references (User ID), ensuring that query results are strictly scoped to the logged-in individual.
* Calculation Engine: Developed server-side logic to dynamically compute total balances, aggregate monthly expenses, and track category-specific spending ceilings.

### 3. Serverless Optimization
* Deployment Optimization: Utilized a monorepo structure and custom Vercel configuration to handle seamless client-side routing and serverless backend API rendering under a single unified domain wrapper.

## Technology Stack

* Frontend: React.js, JavaScript (ES6+), HTML5, CSS3
* Backend Server: Node.js, Express.js (Optimized for Vercel Serverless)
* Database Layer: MongoDB Atlas, Mongoose ODM
* Libraries & Security: JSON Web Tokens (JWT), Bcrypt