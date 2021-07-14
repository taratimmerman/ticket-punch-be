const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../auth/secret');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
  
    if(!token){
      res.status(401).json("Valid token required to access this endpoint");
    }else{
      jwt.verify(token,jwtSecret, (err,decoded)=>{
        if(err){
          res.status(401).json("Sorry, your token is invalid");
        }else{
          req.decodedToken = decoded;
          next();
        }
      });
    }
};