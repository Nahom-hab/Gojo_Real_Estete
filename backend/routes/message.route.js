// routes/messageRoutes.js

import express from 'express';
import {
    getMessages
} from '../controller/message.controller.js';

const router = express.Router();


// Route to get all messages
router.get('/', getMessages);


export default router;
