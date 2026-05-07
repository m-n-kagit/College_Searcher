import { verifyToken } from '../utils/jwt.js';
export const protect = (req, res, next) => {
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};
//# sourceMappingURL=auth.middleware.js.map