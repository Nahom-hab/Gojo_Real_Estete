import express from 'express';
import {
    createListing,
    getListings,
    getListingById,
    updateListing,
    deleteListing,
    manyListing
} from '../controller/listing.controller.js'
import AuthUser from '../middlewere/authUser.js';
import AdminMiddleWere from '../middlewere/authMiddleware.js';


const router = express.Router();


// Create a new listing
router.post('/', AuthUser, createListing);
router.post('/all', manyListing);


// Get all listings
router.get('/', getListings);


// Get a single listing by ID
router.get('/:id', getListingById);


// Update a listing by ID
router.put('/:id', AuthUser, updateListing);
router.delete('/:id', AuthUser, deleteListing);


// Delete a listing by ID
router.put('/admin/:id', AdminMiddleWere, deleteListing);

router.delete('/admin/:id', AdminMiddleWere, deleteListing);



export default router;
