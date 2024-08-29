const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      throw new Error('User not found.');
    }


    const tokenExists = user.tokens.some((t) => t.token === token);
    if (!tokenExists) {
      throw new Error('Token not matching.');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate as user.' });
  }
};

module.exports = userAuth;
