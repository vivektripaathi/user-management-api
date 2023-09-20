# User Management API

## Overview

This is a User Management API built using Node.js, Express.js, and Sequelize for PostgreSQL. It provides basic CRUD operations for managing user accounts, including creating, retrieving, updating, and deleting user information.

## Features

- **User Model**: Includes fields such as `id`, `username`, `email`, `password`, `createdAt`, and `updatedAt`.
- **API Endpoints**:
  - `POST /api/users`: Create a new user.
  - `GET /api/users`: Retrieve a list of all users.
  - `GET /api/users/:id`: Retrieve a specific user by their ID.
  - `PUT /api/users/:id`: Update an existing user's information.
  - `DELETE /api/users/:id`: Delete a user by their ID.
- **Validation**: Handles validation errors properly with meaningful error messages.
- **Error Handling**: Implements global error handling middleware to catch unhandled errors and return appropriate HTTP responses.
- **Security**: Hashes user passwords before storing them and protects sensitive routes with authentication.
- **Update Conflicts**: Handles cases where multiple requests try to update the same user simultaneously.
- **Delete User**: Implements cascading deletes when deleting a user (e.g., related user posts are deleted).

## Getting Started

### Prerequisites

- Node.js 
- PostgreSQL 
- Sequelize CLI 

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vivek-tripathi-9005/user-management-api.git
cd user-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root of the project
```bash
touch .env
```

4. Add below environment variables to `.env` file:
```env
PORT=__YourPostgreSQLPort__
USERNAME=__YourPostgreSQLUserName__
PASSWORD=__YourPostgreSQLPassword__
DATABASE=__YourPostgreSQLDatabase__
HOST=localhost
SECRET=__YourSecretForjwtGoesHere__
API_URL=http://localhost:3000/api
```
5. Start the server:
```bash
npm run start
```

## Usage
- Access the API at `http://localhost:3000/api`
- Use tools like for testing.
- For swagger Documentation head over to `http://localhost:3000/api-docs/`

## Contributing
Contributions are welcome! Feel free to open issues and pull requests.

## Acknowledgments
- Special thanks to the Node.js and Express.js communities.
- Sequelize for providing an excellent ORM for PostgreSQL.