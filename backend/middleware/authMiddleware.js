const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (rq, rs, next) => {
  let token;

  /* when the token is sent in the auth header, it starts with 'Bearer token', here we are checking if there is auth in the header and whether it starts with Bearer **/
  if (
    rq.headers.authorization &&
    rq.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //getting token from header:
      token = rq.headers.authorization.split(" ")[1];

      //verfiy the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user id from token
      rq.user = await User.findById(decoded.id).select("-password");

      //moving to the next piece of middleware
      next();
    } catch (error) {
      console.log(error);
      rs.status(401);
      throw new Error("Not authorized to access this route");
    }
  }

  if (!token) {
    rs.status(400);
    throw new Error("Not authorized, no token detected");
  }
});

module.exports = {
  protect,
};
