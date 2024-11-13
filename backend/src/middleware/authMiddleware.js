import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the 'Authorization' header

  if (!token) {
    return res.status(403).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token and attach the user info to the request
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
