const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    console.log(token);
    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      req.body._id = decoded?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authMiddleware };
