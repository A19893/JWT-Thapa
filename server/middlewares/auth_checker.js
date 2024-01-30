const jwt = require("jsonwebtoken");
const { user_model } = require("../models");
const auth_checker = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    if (verifyUser.exp < Math.floor(Date.now() / 1000)) {
      throw new Error("Token has expired");
    }
    const user = await user_model.findOne({ _id: verifyUser.userId });
    req.user=user;
    req.token= token;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized User",error });
  }
};

module.exports = auth_checker;
