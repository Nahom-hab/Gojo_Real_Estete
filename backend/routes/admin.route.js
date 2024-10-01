import express from 'express';
import { loginAdmin, logoutAdmin, ReisterAdmin, deleteAdmin, activateListing, deactivateListing } from '../controller/Admin.controller.js'
import AdminMiddleWere from '../middlewere/authMiddleware.js';
import Admin from '../models/AdminModel.js';

const router = express.Router();

// Admin login route
router.post('/login', loginAdmin);


// Admin can create another admin (protected route)
// router.post('/create/:id', ReisterAdmin);



router.delete('/delete/:id', AdminMiddleWere, deleteAdmin);

router.patch('/deactivate/:id', AdminMiddleWere, deactivateListing);

router.patch('/activate/:id', AdminMiddleWere, activateListing);
router.get('/check-admin-status', AdminMiddleWere, async (req, res) => {
    // Send back the admin's id, email, and username if they are authenticated as an admin
    const admin = await Admin.findById(req.admin.id)
    const { password, ...data } = admin


    if (!admin) {
        return res.json('admin not found')
    }
    res.json({
        id: req.admin.id,
        email: data._doc.email,
        username: data._doc.username,
    });
});


// Admin logout route
router.post('/logout/:id', AdminMiddleWere, logoutAdmin);

export default router;
