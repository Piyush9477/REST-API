# REST API

This is a scalable RESTful API project built using the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring robust authentication and role-based access control. It allows for user registration, login, and provides two roles: user and admin. Users can create, read, update, and delete notes, while admins have additional control over users and system data.

## API Documentation
You can find the complete API documentation published via Postman. This documentation details all available endpoints, required request/response parameters, authentication methods, possible error codes, and sample requests and responses.

- Explore the API documentation:
  https://documenter.getpostman.com/view/34072965/2sB3QFQs4i

The documentation is kept up-to-date and includes:
- Descriptions for each endpoint and its parameters
- Authorization and authentication workflows
- Practical examples for common requests and responses
- Error code references for troubleshooting

## Tech Stack
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
- API Docs: Postman

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/Piyush9477/REST-API
```

2. **Navigate to the project folder**
```bash
cd REST-API
```

3. **Install dependencies**
```bash
cd backend
npm install
```

4. **Create a .env file inside the backend folder**
Add your credentials and environment variables.
```.env
PORT = 8000
CONNECTION_URL = your_database_url
JWT_SECRET= your_jwt_secret_key
```

## Run the project
**Start the backend**
```bash
npm run dev
```
