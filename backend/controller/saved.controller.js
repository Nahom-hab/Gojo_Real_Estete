import Saved from "../models/userSaved.js";

// @desc    Create or update a saved list
// @route   POST /api/saved
// @access  Public (or protected if needed)
export const createOrUpdateSavedList = async (req, res) => {
    const { userId, FavoritedId } = req.body;

    try {
        // Check if the user already has a saved list
        let savedList = await Saved.findOne({ userId });

        if (savedList) {
            // User already has a saved list, push new favorite IDs into the list
            const newFavorites = FavoritedId.filter(id => !savedList.FavoritedId.includes(id)); // Avoid duplicates
            if (newFavorites.length === 0) {
                return res.status(400).json({ message: 'No new favorites to add' });
            }

            savedList.FavoritedId.push(...newFavorites);
            const updatedSavedList = await savedList.save();
            return res.status(200).json(updatedSavedList);
        } else {
            // Create a new saved list for the user
            const newSavedList = new Saved({ userId, FavoritedId });
            const savedList = await newSavedList.save();
            return res.status(201).json(savedList);
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// @desc    Get a saved list by user ID
// @route   GET /api/saved/:userId
// @access  Public
export const getSavedListByUserId = async (req, res) => {
    try {
        const savedList = await Saved.findOne({ userId: req.params.userId });
        if (!savedList) {
            return res.status(404).json({ message: 'Saved list not found' });
        }
        res.json(savedList);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Remove a favorite from a saved list
// @route   DELETE /api/saved/removeFavorite
// @access  Public (or protected if needed)
export const removeFavoriteFromList = async (req, res) => {
    const { userId, resultId } = req.body;

    try {
        const savedList = await Saved.findOne({ userId });
        if (!savedList) {
            return res.status(404).json({ message: 'Saved list not found' });
        }

        // Remove the resultId from FavoritedId array
        savedList.FavoritedId = savedList.FavoritedId.filter(id => id !== resultId);

        // Save the updated list
        const updatedSavedList = await savedList.save();
        return res.status(200).json(updatedSavedList);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a saved list by user ID
// @route   DELETE /api/saved/:userId
// @access  Public (or protected if needed)
export const deleteSavedList = async (req, res) => {
    try {
        const deletedSavedList = await Saved.findOneAndDelete({ userId: req.params.userId });
        if (!deletedSavedList) {
            return res.status(404).json({ message: 'Saved list not found' });
        }
        res.json({ message: 'Saved list deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// @desc    Get a specific saved item by user ID and listing ID
// @route   GET /api/saved/:userId/listing/:listingId
// @access  Public
export const getSavedItemByUserIdAndListingId = async (req, res) => {
    const { userId, listingId } = req.params;

    try {
        // Find the saved list for the user
        const savedList = await Saved.findOne({ userId });
        if (!savedList) {
            return
        }

        // Check if the listingId is in the FavoritedId array
        const isFavorited = savedList.FavoritedId.includes(listingId);

        res.json({ isFavorited });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
