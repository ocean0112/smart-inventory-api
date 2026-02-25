Smart Inventory API

Node.js, Express, and PostgreSQL are used to build a RESTful inventory management backend.

Features
    - JWT Authentication
    - Authorization Based on Role (Admin/Employee)
    - Product CRUD (Admin restricted)
    - Transactions with stock validation in the inventory
    - Pagination & Filtering
    - Secure Environment Variables

Tech Stack
    - Node.js
    - Express
    - PostgreSQL
    - JWT
    - bcrypt

Setup Instructions
    1. Clone repository
    2. Install dependencies
    3. npm install
    4. Create .env file
    5. Run server
        -npm run dev

API Endpoints
    Auth:
        - POST /auth/register
        - POST /auth/login

    Products:
        - POST /products (Admin)
        - GET /products

    Inventory:
        - POST /inventory/:id