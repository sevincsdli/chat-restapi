const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      
      req.payload = payload;
      next();
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
