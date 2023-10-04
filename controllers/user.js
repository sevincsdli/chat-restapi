const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()
const register = async (req, res) => {
  const { name, email, password,repassword} = req.body;

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Email is not supported.",
    });
  }
  if (password.length < 6 || repassword.length<6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long.",
    });
  }
  if(!repassword){
    return res.status(400).json({
      message:"Please, confirm password!",

    }); 
  }
  if(password!=repassword){
    return res.status(400).json({
      message: "Passwords does not match.",
    }); 
  }

  const user = await User.findOne({
    email,
  });

  if (user) {
    return res.status(400).json({
      message: "User already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10); 
  const hashedrePassword = await bcrypt.hash(repassword, 10); 

  const userNew = new User({
    name,
    email,
    password: hashedPassword,
    repassword:hashedrePassword 
  });

  await userNew.save();

  res.json({
    message: `User ${name} registered successfully!`,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Email and Password did not match.",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Email and Password did not match.",
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

  res.json({
    message: "User logged in successfully!",
    token,
  });
};
module.exports={
  register,login
}