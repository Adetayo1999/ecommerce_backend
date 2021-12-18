const User = require("../models/user.model");
const sharp = require("sharp");

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    res.send(user);
  } catch (err) {
    res.status(400).send({
      error: err.message || "Something went wrong",
    });
  }
};

exports.updateUserImage = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  await User.findByIdAndUpdate(req.id, {
    userImage: buffer,
  });
  res.send();
};

exports.getUserImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.userImage) throw new Error();
    res.set("Content-Type", "image/png");
    res.send(user.userImage);
  } catch (err) {
    res.status(404).send();
  }
};
