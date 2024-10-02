import express from 'express';
import { deleteUser, getListings, updateUser, getAllUser, getUser } from '../controller/user.controller.js';
import { verifyUser } from '../utils/verifyuser.js';
import AdminMiddleWere from '../middlewere/authMiddleware.js';

const router = express.Router();

router.post('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser)
router.get('/getListing/:id', verifyUser, getListings)
//get all user
router.get('/', AdminMiddleWere, getAllUser)
router.get('/:id', getUser)


export default router;
