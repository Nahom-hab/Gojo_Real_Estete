import multer from 'multer';

// Set up multer to store files in memory temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
