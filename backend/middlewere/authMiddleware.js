import jwt from 'jsonwebtoken';

const AdminMiddleWere = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
        req.admin = decoded; // Attach decoded admin data to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

export default AdminMiddleWere;
