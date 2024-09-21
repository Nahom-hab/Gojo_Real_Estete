import express from 'express';
import { uploadImages, uploadMiddleware } from '../controller/upload.controller.js';

const router = express.Router();

// Route for uploading images
router.post('/', uploadMiddleware, uploadImages);

export default router;
