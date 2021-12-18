const Task = require("../models/tasks.model");

exports.createTask = async (req, res) => {
  const { description } = req.body;

  if (!description || description === "") {
    res.status(400).send({
      message: "Task description is required",
    });
    return;
  }

  try {
    const task = new Task({
      description,
      author: req.id,
    });

    const response = await task.save();
    res.send(response);
  } catch (err) {
    res.status(400);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ author: req.id })
      .populate("author")
      .limit(10)
      .sort({
        completed: -1,
      });
    res.send(tasks);
  } catch (err) {
    res.status(400).send({
      error: err.message || "Something went wrong",
    });
  }
};
