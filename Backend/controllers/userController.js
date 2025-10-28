

// Core modules
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

// External modules
const User = require("../models/userModel");
const mailer = require("../helpers/mailer");



const userRegister = async (req, res) => {

  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { name, email, mobile, password } = req.body;
    const isExists = await User.findOne({ email });

  if (isExists) {
    return res.status(400).json({
      success: false,
      msg: "User already exists"
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      mobile,
      password: hashPassword,
      image: "images/" + req.file.filename,
    });

    const userData = await user.save();

    const msg = `
  <h1>Welcome to our Application</h1>
  <p>Please <a href="http://localhost:4000/mail-verification?id=${userData._id}">verify your email</a></p>
`;


mailer.sendMail(email, "Mail Verification", msg);

    return res.status(200).json({
      success: true,
      msg: "Registered Successfully!",
      user: userData,
    });
  }


   catch (error) {
    return res.status(400).json({
      success: false,
      msg: "problem  with user register" + error.message,
    });
  }
};


module.exports = {
  userRegister,
};
