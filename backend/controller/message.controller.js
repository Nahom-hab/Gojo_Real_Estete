// controllers/messageController.js

import Message from '../models/message.js'; // Adjust the path according to your folder structure



// Get all messages
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: error.message });
    }
};

