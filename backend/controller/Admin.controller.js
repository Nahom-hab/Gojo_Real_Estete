import Admin from '../models/AdminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Listing from '../models/listingModel.js';

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_ADMIN_SECRET, { expiresIn: '1h' });

            // Send JWT token as cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000, // 1 hour
            });
            const { password, ...data } = admin
            res.json({ message: 'Login successful', adminData: data._doc });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Admin logout
// @route   POST /api/admin/logout
// @access  Private
export const logoutAdmin = (req, res) => {
    if (req.admin.id == req.params.id) {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    }
}


export const ReisterAdmin = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        // Check if username or email already exists
        const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create the admin
        const newAdmin = new Admin({
            username,
            password: hashedPassword,
            email,
        });

        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete admin by username
// @route   DELETE /api/admin/:username
// @access  Public (or protected if needed)
export const deleteAdmin = async (req, res) => {
    if (req.admin.id == req.params.id) {

        try {
            const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
            if (!deletedAdmin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            res.json({ message: 'Admin deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(400).json('you can only delete this admin account if you are the admin')
    }
};

// Activate Listing Controller
export const activateListing = async (req, res, next) => {
    const { id } = req.params;  // Retrieve listing ID from the URL params



    try {
        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        listing.activated = true;
        await listing.save();

        return res.status(200).json({ message: "Listing activated successfully", listing });
    } catch (error) {
        next(error);  // Pass the error to an error handling middleware
    }

};

// Deactivate Listing Controller
export const deactivateListing = async (req, res, next) => {
    const { id } = req.params;  // Retrieve listing ID from the URL params

    try {
        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        listing.activated = false;
        await listing.save();

        return res.status(200).json({ message: "Listing deactivated successfully", listing });
    } catch (error) {
        next(error);  // Pass the error to an error handling middleware
    }

};


