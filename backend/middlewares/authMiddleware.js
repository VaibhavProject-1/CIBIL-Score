//Token middleware
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    const tokenExists = await Token.findOne({ token });
    if (!tokenExists) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;

//admin middleware
// const adminMiddleware = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();


module.exports = adminMiddleware;