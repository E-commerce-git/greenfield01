// const jwt = require('jsonwebtoken');
// const User = require('../database/model/user');

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// exports.authenticate = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ message: 'Authentication required' });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findByPk(decoded.userId);

//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ 
//         message: 'You do not have permission to perform this action' 
//       });
//     }
//     next();
//   };
// };