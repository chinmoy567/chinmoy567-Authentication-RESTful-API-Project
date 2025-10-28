// Core modules
const express = require('express');

const path = require('path');
const multer = require('multer');

const userRoute = express.Router();
userRoute.use(express.json());


// External modules
const userController = require("../controllers/userController");
const { registerValidator } = require("../helpers/validation");



// --- Multer Disk Storage Configuration ---
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          cb(null, path.join(__dirname, "../public/images"));
        } else {
          cb(new Error(" Only JPEG and PNG files are allowed!"), false);
        }
    },

    filename: function(req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});



// UserRoutes
userRoute.post("/register",upload.single("image"),registerValidator,userController.userRegister);




module.exports = userRoute;
