const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.find({ email: req.body.email });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.status(200).json({ message: "User saved successfully" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (!user.length) {
      return res.status(400).json({ message: "User does not exists" });
    }
    if (user[0].password == req.body.password) {
      return res.status(200).json({
        name: user[0].name,
        email: user[0].email,
        _id: user[0]._id,
      });
    } else {
      return res.status(400).json({ message: "Password does not match" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    const { name, email, userid, password } = req.body;
    await User.findByIdAndUpdate(userid,{
        name,
        email,
        password
    })
    res.status(200).json({ message: "User saved successfully" });
  } catch (err) {
    return res.status(400).json(err);
  }
});
module.exports = router;
