const User = require("../models/user.model");
const { hash, compare } = require("bcrypt");
const { createAccessToken } = require("../tokens");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await hash(password, 8);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send({ message: "User Created" });
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid Email/Password");

    const isPassword = await compare(password, user.password);

    if (!isPassword) throw new Error("Invalid Email/Password");
    const token = createAccessToken(user.id);

    user.tokens = user.tokens.concat({ token });

    await user.save();

    res.send({ user, token });
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
};
