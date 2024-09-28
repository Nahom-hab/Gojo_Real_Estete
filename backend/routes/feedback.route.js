// routes/messageRoutes.js
import express from 'express';
import {
    createMessage,
    getMessages
} from '../controller/feedback.constroller.js'; // Adjust the path as needed

const router = express.Router();

// Route to create a new message
router.post('/', createMessage);

// Route to get all messages
router.get('/', getMessages);



export default router;