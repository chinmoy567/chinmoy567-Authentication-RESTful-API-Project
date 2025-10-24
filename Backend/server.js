
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect("mongodb://192.168.0.100:27017/restful-auth-apis");




const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.listen(port, function () {
  console.log("Server Listen on port " + port);
});
