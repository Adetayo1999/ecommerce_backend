const uploader = require("../config/multer");
const {
  getUserDetails,
  updateUserImage,
  getUserImage,
} = require("../controllers/user.controller");
const verifyUser = require("../middlewares/verifyUser");

const router = require("express").Router();

router.get("/", verifyUser, getUserDetails);
router.post(
  "/updateavatar",
  [verifyUser, uploader.single("avatar")],
  updateUserImage,
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message,
    });
  }
);
router.get("/:id/avatar", getUserImage);

module.exports = router;
