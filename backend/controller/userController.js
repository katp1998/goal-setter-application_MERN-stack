const registerUser = (rq, rs) => {
  rs.json({ message: "register user" });
};

module.exports = {
  registerUser,
};
