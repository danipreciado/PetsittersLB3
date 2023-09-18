const jwt = require('jsonwebtoken');

module.exports = function(secret) {
  return function(req, res, next) {

    if (
        req.path === "/api/usuarios/login" ||
        req.path === "/api/usuarios/signup"
    ) {
        return next();
    }
    const queryToken = req.query.access_token;
    const accessToken = req.header("Authorization") || queryToken;
    if (!accessToken) {
      return res.status(401).json({ message: "User not authenticated" });
    }
   
   try {
      const validToken = jwt.verify(accessToken, 'secret');
      req.user = validToken;
      if (validToken) {
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid Token" });
    } 
  };
};



