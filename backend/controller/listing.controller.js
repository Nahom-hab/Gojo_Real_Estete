import Listing from "../models/listingModel.js";

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Public (or protected if needed)
export const createListing = async (req, res) => {
    const {
        name, description, address, regularPrice, discountedPrice, bathrooms,
        bedrooms, phoneNumber, basement, parking, RentOrSell, HomeType,
        imageURLs, userRef, lat, lon
    } = req.body;

    try {
        const newListing = new Listing({
            name, description, address, regularPrice, discountedPrice, bathrooms,
            bedrooms, phoneNumber, basement, parking, RentOrSell, HomeType,
            imageURLs, userRef, lat, lon
        });

        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a single listing by ID
// @route   GET /api/listings/:id
// @access  Public
export const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Public (or protected if needed)
export const updateListing = async (req, res) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(updatedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Public (or protected if needed)
export const deleteListing = async (req, res) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);
        if (!deletedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
