const jwt = require("jsonwebtoken");
const secret = require("./secret");

module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if(err) {
        //token is invalid
        res.status(401).json({ you: "invalid"})
      } else {
        //token is valid
        req.jwt = decodedToken;
        next()
      }
    })
  } else {
    res.status(401).json({ message: "you shall not pass" })
  }
  
};
