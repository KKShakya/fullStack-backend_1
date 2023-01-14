const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      console.log(decoded);
      const userID = decoded.userID;
      req.body.userID = userID;
      next();
    } else {
      res.send("Please Login");
    }
  } else {
    res.send("Enter token");
  }
};
module.exports = {
  authenticate,
};
