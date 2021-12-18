const { createTask, getTasks } = require("../controllers/task.controller");
const verifyUser = require("../middlewares/verifyUser");

const router = require("express").Router();

router.post("/create", verifyUser, createTask);

router.get("/tasks", verifyUser, getTasks);

module.exports = router;
