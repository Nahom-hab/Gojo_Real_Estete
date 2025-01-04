import Listing from "../models/listingModel.js";
import Message from "../models/message.js";
import User from "../models/userModel.js";

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Public (or protected if needed)
export const createListing = async (req, res) => {
    console.log(req.body);

    const { id } = req.user
    if (req.body.userRef !== id) {
        return res.json('cant create a listing with other user id')
    }
    try {
        const newListing = new Listing(req.body);


        const user = await User.findById(req.body.userRef)
        console.log(user);


        const savedListing = await newListing.save();
        const newMessage = new Message({
            name: `${newListing.name} in ${newListing.address}`,
            listingId: savedListing._id,
            message: `New listing created for ${newListing.RentOrSell} by ${user.username}`,
            type: 'listing'
        })
        await newMessage.save()

        res.status(201).json(savedListing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const manyListing = async (req, res) => {
    const listings = req.body;

    if (!Array.isArray(listings)) {
        return res.status(400).json({ message: "Request body must be an array of listings." });
    }

    try {
        // Create an array of promises for saving listings
        const savePromises = listings.map(listingData => {
            const newListing = new Listing(listingData);
            return newListing.save();
        });

        // Wait for all promises to resolve
        const savedListings = await Promise.all(savePromises);

        res.status(201).json({
            message: 'Successfully created all listings',
            count: savedListings.length,
            listings: savedListings // Optional: return the saved listings
        });
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
    const { id } = req.user



    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id)
        if (!listing) {
            return res.json('No listing found with this id')
        }
        if (listing.userRef !== id) {
            return res.json('cant update other User listing')
        }
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        const user = await User.findById(req.body.userRef)

        const newMessage = new Message({
            name: `${req.body.name} in ${req.body.address}`,
            listingId: updatedListing._id,
            message: `${user.username} edited ${req.body.name} listing`,
            type: 'listing'
        })
        await newMessage.save()
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
