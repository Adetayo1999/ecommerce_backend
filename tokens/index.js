const { sign } = require("jsonwebtoken");

exports.createAccessToken = (id) => {
  return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10 minutes",
  });
};
