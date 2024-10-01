import express from 'express'
import { login, sendOtp, signout, signup, userdata, verifyOtp, userExists } from '../controller/auth.controller.js'
import AuthUser from '../middlewere/authUser.js'
import User from '../models/userModel.js'

const router = express.Router()


router.post('/signup', signup)
router.post('/login', login)
router.post('/login', userExists)
router.post('/userExists', userdata)
router.get('/signout', signout)
router.post('/sendOtp', sendOtp)
router.post('/VerifyOtp', verifyOtp)
router.get('/check-user-status', AuthUser, async (req, res) => {
    // Send back the admin's id, email, and username if they are authenticated as an admin
    const user = await User.findById(req.user.id)
    const { password, ...data } = user
    if (!user) {
        return res.json('user not found')
    }
    res.json({
        id: req.user.id,
        email: data._doc.email,
        username: data._doc.username,
        avatar: data._doc.avatar
    });
});





export default router