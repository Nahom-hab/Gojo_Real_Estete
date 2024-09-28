
import Feedback from "../models/feedback.js"; // Adjust the path as needed
export const createMessage = async (req, res) => {
    const { name, phoneNumber, email, message } = req.body;

    // Basic validation
    if (!name || !phoneNumber || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const newMessage = new Feedback({ name, phoneNumber, email, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};


// Get all messages
export const getMessages = async (req, res) => {
    try {
        const messages = await Feedback.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};