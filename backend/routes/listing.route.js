import express from 'express';
import {
    createListing,
    getListings,
    getListingById,
    updateListing,
    deleteListing,
    manyListing
} from '../controller/listing.controller.js'

const router = express.Router();

// Create a new listing
router.post('/', createListing);
router.post('/all', manyListing);


// Get all listings
router.get('/', getListings);


// Get a single listing by ID
router.get('/:id', getListingById);

// Update a listing by ID
router.put('/:id', updateListing);

// Delete a listing by ID
router.delete('/:id', deleteListing);

export default router;
