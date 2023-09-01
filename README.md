# Ticketing System - Full Stack Application

This is a 3-tier ticketing web application built with React (frontend), Node.js/Express (backend), and PostgreSQL (database). It allows users to log in, create tickets, view all logged tickets, filter them, and more.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Connection Details](#database-connection-details)
- [Running the Application](#running-the-application)
- [Login Details](#login-details)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: Download and install [Node.js](https://nodejs.org/).
- PostgreSQL: Download and install [PostgreSQL](https://www.postgresql.org/).

## Frontend Setup

1. Navigate to the `client` directory.

```bash
cd client
```

2. Install the required dependencies.

```bash
npm install
```

## Backend Setup

1. Navigate to the `server` directory.

```bash
cd server
```

2. Install the required dependencies.

```bash
npm install
```

## Database Connection Details

1. Use the follwing details to connect to PostgreSQL database to view Tickets and User data.

```bash
POSTGRES_URL="postgres://default:28DiNMxZdAgu@ep-little-flower-91632407-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="ep-little-flower-91632407-pooler.us-east-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD="28DiNMxZdAgu"
POSTGRES_DATABASE="verceldb"
```

## Running the Application

1. Start the backend server. From the `server` directory:

```bash
npm start
```
The backend server will start port 5000.  `http://localhost:5000`

2. Start the frontend development server. From the `client` directory:

```bash
npm start
```
The frontend development server will start, and you can access the application in your web browser at `http://localhost:3000`.

## Login Details

1. Once you get the application running, browse to `http://localhost:3000/login` and login using the below details to test the application

```bash
email: nhlanhla@gmail.com
password: Test123#
```



