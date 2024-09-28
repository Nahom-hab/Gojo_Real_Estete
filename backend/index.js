import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/user.route.js';
import uploadRoutes from './routes/upload.route.js';
import authRouter from './routes/auth.route.js';
import ListingRouter from './routes/listing.route.js';
import favoriteRouter from './routes/saved.route.js';
import AdminRouter from './routes/admin.route.js';
import feedbackRouter from './routes/feedback.route.js';
import MessageRouter from './routes/message.route.js';




const app = express();
dotenv.config();
app.use(cookieParser());

// Connect to the database
mongoose.connect("mongodb+srv://nahomhab7:zJ7uVcQ7A$KM-L8@cluster0.9g5y5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error(err);
    });

// Get the absolute path to our backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/saved', favoriteRouter);
app.use('/api/listing', ListingRouter);
app.use('/api/upload', uploadRoutes);
app.use('/api/feedback', feedbackRouter);
app.use('/api/message', MessageRouter);





// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

// Global error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
