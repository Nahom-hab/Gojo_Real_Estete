import multer from 'multer';
import path from 'path';

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize Multer with the storage settings and limits
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Invalid file type!'));
    }
});

// Middleware to handle file uploads
export const uploadMiddleware = (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).send({ error: err.message });
        }
        next();
    });
};

// Controller for handling image uploads
export const uploadImages = (req, res) => {
    try {
        const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
        res.json({ imagePaths });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send({ error: 'Failed to upload images' });
    }
};
