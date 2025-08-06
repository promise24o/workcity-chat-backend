# Workcity Chat Backend

Backend for a real-time chat system integrated with an eCommerce platform. Built with Node.js, Express, MongoDB, and Socket.IO.

## Setup

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following:
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000

## API Endpoints

- `POST /api/auth/signup`: Create user (email, password, role).
- `POST /api/auth/login`: Authenticate user, return JWT and user data.
- `POST /api/conversations`: Start a new conversation.
- `GET /api/conversations`: List user conversations.
- `POST /api/messages`: Send a message.
- `GET /api/messages/:conversationId`: Get conversation messages.
- `PUT /api/messages/:messageId/read`: Mark message as read.

## Challenges

- Ensured secure JWT authentication with role-based access.
- Managed real-time messaging with Socket.IO rooms.
