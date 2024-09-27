import express from 'express';
import { loginAdmin, logoutAdmin, ReisterAdmin, deleteAdmin } from '../controller/Admin.controller.js'
import protect from '../middlewere/authMiddleware.js';

const router = express.Router();

// Admin login route
router.post('/login', loginAdmin);


// Admin can create another admin (protected route)
router.post('/create', ReisterAdmin);



router.delete('/delete', deleteAdmin);


// Admin logout route
router.post('/logout', logoutAdmin);

export default router;
