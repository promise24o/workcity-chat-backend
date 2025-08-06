const Conversation = require('../models/Conversation');

const createConversation = async (req, res, next) => {
    try {
        const { participants } = req.body;
        const conversation = new Conversation({ participants });
        await conversation.save();
        res.status(201).json(conversation);
    } catch (error) {
        next(error);
    }
};

const getConversations = async (req, res, next) => {
    try {
        const conversations = await Conversation.find({
            participants: req.user.id,
        }).populate('participants', 'email role');
        res.json(conversations);
    } catch (error) {
        next(error);
    }
};

module.exports = { createConversation, getConversations };