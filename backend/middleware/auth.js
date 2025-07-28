// backend/middleware/auth.js

// Simple mock auth middleware for demo purposes
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Simple token verification for demo (in real app, use proper JWT verification)
    if (token === 'demo-token' || token.startsWith('user-')) {
      req.user = { id: 'user123', name: 'Demo User' };
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Authentication error' });
  }
};

module.exports = auth;
