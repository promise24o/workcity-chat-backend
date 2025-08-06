const express = require('express');
const { sendMessage, getMessages, markAsRead } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/', sendMessage);
router.get('/:conversationId', getMessages);
router.put('/:messageId/read', markAsRead);

module.exports = router;