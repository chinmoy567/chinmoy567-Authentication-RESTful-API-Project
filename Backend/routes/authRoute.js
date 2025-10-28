// Core modules
const express = require('express');

const router = express.Router();
router.use(express.json());


// External modules
const userController = require("../controllers/userController");


// UserRoutes
router.get("/mail-verification", userController.mailVerification);




module.exports = router;
