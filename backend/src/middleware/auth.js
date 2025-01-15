const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({ message: 'Autenticación fallida', error: error.message });
  }
}; 