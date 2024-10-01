import express from 'express';
import cloudinary from '../config/cloudinary.config.js';
import upload from '../config/multer.js';
const router = express.Router();

// POST route to upload multiple images
router.post('/', upload.array('images', 5), (req, res) => {
    const files = req.files; // Access the uploaded files correctly

    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    let uploadPromises = [];

    // Loop through each file and upload it to Cloudinary
    files.forEach(file => {
        const uploadPromise = new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'uploads', // Specify the Cloudinary folder
                    transformation: [
                        { width: 800, height: 600, crop: 'fill', gravity: 'center' } // Cover effect
                    ]
                },
                (error, result) => {
                    if (error) {
                        reject({ message: 'Cloudinary upload failed', error });
                    } else {
                        resolve(result.secure_url); // Get the image URL
                    }
                }
            );
            uploadStream.end(file.buffer); // Send the file buffer to the Cloudinary stream
        });

        uploadPromises.push(uploadPromise);
    });

    // Wait for all images to be uploaded
    Promise.all(uploadPromises)
        .then((urls) => {
            res.status(200).json({
                message: 'Images uploaded successfully!',
                urls, // Send back an array of Cloudinary URLs
            });
        })
        .catch((error) => {
            console.error('Error uploading images:', error);
            res.status(500).json({ message: 'Error uploading images', error });
        });
});

export default router;
