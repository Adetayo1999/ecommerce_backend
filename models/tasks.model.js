const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tasksSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.model("Task", tasksSchema);

module.exports = taskModel;
