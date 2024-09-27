import express from 'express';
import {
    createOrUpdateSavedList,
    getSavedListByUserId,
    removeFavoriteFromList,
    deleteSavedList,
    getSavedItemByUserIdAndListingId
} from '../controller/saved.controller.js'; // Adjust the path as needed

const router = express.Router();

// @desc    Create or update a saved list
// @route   POST /api/saved
// @access  Public (or protected if needed)
router.post('/', createOrUpdateSavedList);

// @desc    Get a saved list by user ID
// @route   GET /api/saved/:userId
// @access  Public
router.get('/:userId', getSavedListByUserId);

// @desc    Remove a favorite from a saved list
// @route   DELETE /api/saved/removeFavorite
// @access  Public (or protected if needed)
router.delete('/removeFavorite', removeFavoriteFromList);

// @desc    Delete a saved list by user ID
// @route   DELETE /api/saved/:userId
// @access  Public (or protected if needed)
router.delete('/:userId', deleteSavedList);

// @desc    Get a specific saved item by user ID and listing ID
// @route   GET /api/saved/:userId/listing/:listingId
// @access  Public
router.get('/:userId/listing/:listingId', getSavedItemByUserIdAndListingId);

export default router;
