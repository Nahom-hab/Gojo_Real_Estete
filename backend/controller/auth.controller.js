import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandeler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { transporter } from "../config/transporter.config.js";

import Otp from "../models/otp.js";

// Signup function
export const signup = async (req, res, next) => {
   const { username, password, email } = req.body;
   try {
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(409).json({ message: "User already exists. You cannot signup." });
      }

      // Hash the password
      const hashedpassword = bcryptjs.hashSync(password, 10);

      // Create a new user
      const newuser = new User({ username, password: hashedpassword, email });
      await newuser.save();

      res.status(201).json("User created successfully");
   } catch (err) {
      next(err);
   }
};

// Check if the user exists 
export const userExists = async (req, res, next) => {
   const { email, username } = req.body;
   try {
      const userByEmail = await User.findOne({ email });
      const userByUsername = await User.findOne({ username });

      if (userByEmail && userByUsername) {
         return res.json({ userExists: true, message: "User with both email and username already exists. You cannot sign up." });
      } else if (userByEmail) {
         return res.json({ userExists: true, message: "User with this email already exists. You cannot sign up." });
      } else if (userByUsername) {
         return res.json({ userExists: true, message: "User with this username already exists. You cannot sign up." });
      } else {
         return res.json({ userExists: false });
      }
   } catch (error) {
      next(error);
   }
};

// Login function
export const login = async (req, res, next) => {
   const { email, password } = req.body;
   try {
      // Find the user by email
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandeler(404, "User not found"));

      // Check if the password is correct
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandeler(401, "Wrong credentials"));

      // Sign JWT token
      const token = jwt.sign({ id: validUser._id }, process.env.SECRET, { expiresIn: "1h" });

      // Exclude password from response
      const { password: hashedpassword, ...otheruserdata } = validUser._doc;

      // Set cookie and send response
      res
         .cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "Strict" })
         .status(200)
         .json(otheruserdata);
   } catch (err) {
      next(err);
   }
};

// Retrieve user data by email
export const userdata = async (req, res, next) => {
   const { email } = req.body;
   try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandeler(404, "User not found"));

      const { password, ...otheruserdata } = validUser._doc;
      res.json(otheruserdata);
   } catch (error) {
      next(error);
   }
};

// Signout function
export const signout = (req, res, next) => {
   try {
      res.clearCookie("access_token", { path: "/", domain: "yourdomain.com" });
      res.status(200).json("User logged out");
   } catch (error) {
      next(error);
   }
};

// Send OTP function
export const sendOtp = async (req, res) => {
   const { email } = req.body;
   try {
      // Generate OTP
      const otp = otpGenerator.generate(5, { upperCase: false, specialChars: false });
      const hashedOtp = bcryptjs.hashSync(otp, 10); // Hashing OTP

      // Send OTP email using Nodemailer
      const mailOptions = {
         from: "nahomhabtamu147@gmail.com",
         to: email,
         subject: "Your OTP Code",
         html: `<h1>Hello</h1><p>Your OTP code is: <strong>${otp}</strong></p>`,
      };

      await transporter.sendMail(mailOptions);

      // Check if OTP already exists for the user
      const otpsent = await Otp.findOne({ email });
      if (otpsent) {
         await Otp.findByIdAndUpdate(
            otpsent._id,
            { otp: hashedOtp, email, verified: false },
            { new: true }
         );
      } else {
         const newOtp = new Otp({ otp: hashedOtp, email, verified: false });
         await newOtp.save();
      }

      res.status(200).json({ message: "OTP sent successfully." });
   } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: "Error sending OTP", error: error.message });
   }
};

// Verify OTP function
export const verifyOtp = async (req, res) => {
   const { email, otp } = req.body;
   try {
      const otpData = await Otp.findOne({ email });
      if (!otpData) return res.status(400).json({ message: "Invalid request" });

      // Compare hashed OTPs
      const isMatch = bcryptjs.compareSync(otp, otpData.otp);
      if (isMatch) {
         await Otp.findByIdAndUpdate(otpData._id, { verified: true });
         res.status(200).json({ otpVerified: true, message: "OTP verified successfully." });
      } else {
         res.status(400).json({ otpVerified: false, message: "Incorrect OTP. Try again." });
      }
   } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Error verifying OTP", error: error.message });
   }
};
