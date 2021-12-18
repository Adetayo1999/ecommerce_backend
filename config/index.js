const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecommerceapp");

mongoose.connection
  .once("open", () => {
    console.log("Connection Made To MongoDB");
  })
  .on("error", (error) => {
    console.log("Something went wrong");
  });
