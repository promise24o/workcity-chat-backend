const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const socketHandler = require('./sockets/socketHandler');

// Load environment variables
dotenv.config();

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }, // Adjust for production
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

// Socket.IO
socketHandler(io);

// Error handling middleware
app.use(errorMiddleware);

// Root route
app.get('/', (req, res) => res.send('Workcity Chat Backend'));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));