import express from 'express'
import { login, sendOtp, signout, signup, userdata, verifyOtp, userExists } from '../controller/auth.controller.js'

const router = express.Router()


router.post('/signup', signup)
router.post('/login', login)
router.post('/login', userExists)
router.post('/userExists', userdata)
router.get('/signout', signout)
router.post('/sendOtp', sendOtp)
router.post('/VerifyOtp', verifyOtp)




export default router