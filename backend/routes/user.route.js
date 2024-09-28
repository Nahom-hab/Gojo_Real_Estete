import express from 'express';
import { deleteUser, getListings, updateUser, getAllUser } from '../controller/user.controller.js';
import { verifyUser } from '../utils/verifyuser.js';

const router = express.Router();

router.post('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser)
router.get('/getListing/:id', verifyUser, getListings)
//get all user
router.get('/', getAllUser)

export default router;
