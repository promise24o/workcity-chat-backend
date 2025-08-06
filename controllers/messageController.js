const Message = require('../models/Message');

const sendMessage = async (req, res, next) => {
    try {
        const { conversationId, content } = req.body;
        const message = new Message({
            conversationId,
            sender: req.user.id,
            content,
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        next(error);
    }
};

const getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        }).populate('sender', 'email role');
        res.json(messages);
    } catch (error) {
        next(error);
    }
};

const markAsRead = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        message.read = true;
        await message.save();
        res.json(message);
    } catch (error) {
        next(error);
    }
};

module.exports = { sendMessage, getMessages, markAsRead };