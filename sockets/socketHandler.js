const Message = require('../models/Message');

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Join conversation room
        socket.on('joinConversation', (conversationId) => {
            socket.join(conversationId);
        });

        // Send message
        socket.on('sendMessage', async ({ conversationId, content, senderId }) => {
            try {
                const message = new Message({
                    conversationId,
                    sender: senderId,
                    content,
                });
                await message.save();
                io.to(conversationId).emit('newMessage', message);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        // Typing indicator (bonus)
        socket.on('typing', ({ conversationId, userId }) => {
            socket.to(conversationId).emit('typing', userId);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

module.exports = socketHandler;