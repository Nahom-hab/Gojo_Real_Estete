import express from 'express';
import { loginAdmin, logoutAdmin, ReisterAdmin, deleteAdmin, activateListing, deactivateListing } from '../controller/Admin.controller.js'
import protect from '../middlewere/authMiddleware.js';

const router = express.Router();

// Admin login route
router.post('/login', loginAdmin);


// Admin can create another admin (protected route)
router.post('/create', ReisterAdmin);



router.delete('/delete', deleteAdmin);

router.patch('/deactivate/:id', deactivateListing);

router.patch('/activate/:id', activateListing);


// Admin logout route
router.post('/logout', logoutAdmin);

export default router;
