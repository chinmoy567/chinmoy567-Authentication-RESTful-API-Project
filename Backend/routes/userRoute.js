const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
router.use(express.json());



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

module.exports = upload;