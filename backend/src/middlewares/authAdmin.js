const jwt = require('jsonwebtoken');

module.exports = function authAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    req.admin = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};