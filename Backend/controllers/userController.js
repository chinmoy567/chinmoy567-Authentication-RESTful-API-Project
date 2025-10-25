

// Core modules
const bcrypt = require("bcrypt");

// External modules
const User = require("../models/userModel");



const userRegister = async (req, res) => {

  try {
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
