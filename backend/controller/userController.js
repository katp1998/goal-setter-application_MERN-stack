const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//Descp: register user
//Route: POST /api/users/
//Access: PUBLIC
const registerUser = asyncHandler(async (rq, rs) => {
  //items to get:
  const { name, email, password } = rq.body;

  //validation: if all fields are added:
  if (!name || !email || !password) {
    rs.status(400);
    throw new Error("Add all fields!");
  }

  //validation: if the same user exists:
  const userExists = await User.findOne({ email });
  if (userExists) {
    rs.status(400);
    throw new Error("User already exists");
  }
  //after validations:
  //hashing password:
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating user:
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //notification after user was created:
  if (user) {
    rs.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    rs.status(400);
    throw new Error("User was not created successfully");
  }
});

//Descp: authenticate user
//Route: POST /api/users/login
//Access: PUBLIC
const loginUser = asyncHandler(async (rq, rs) => {
  const { email, password } = rq.body;

  //checking user
  const user = await User.findOne({ email });

  //validation: passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    rs.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    rs.status(400);
    throw new Error("Invalid login data");
  }
});

//Descp: get user data
//Route: GET /api/users/me
//Access: PRIVATE
const getMe = asyncHandler(async (rq, rs) => {
  const { _id, name, email } = await User.findById(rq.user.id); //have access since we set in the middleware
  rs.status(200).json({
    id: _id,
    name,
    email,
  });
});

/** GENERATING JWT */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
