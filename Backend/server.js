// coremodules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


// External modules
const userRoute = require("./routes/userRoute");


const app = express();
const port = process.env.SERVER_PORT;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" MongoDB connection error:", err));



// Middlewares
app.use("/api", userRoute);


// Start the server
app.listen(port, () => {
  console.log(` Server running on: http://localhost:${port}`);
});
