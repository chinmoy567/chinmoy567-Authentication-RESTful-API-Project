// Core modules
const express = require('express');

const path = require('path');
const multer = require('multer');

const userRouter = express.Router();
userRouter.use(express.json());


// External modules
const userController = require("../controllers/userController");



// --- Multer Disk Storage Configuration ---
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images')); 
    },
    filename: function(req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const upload = multer({ storage: storage }); 



// UserRouters

userRouter.post("/register",upload.single("image"),userController.userRegister);




module.exports = userRouter;
