const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.registerUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  bcrypt.hash(password, 10, function (err, hash) {
    var user = new User({
      username: username,
      password: hash,
    });
    user
      .save()
      .then(function (result) {
        res.render("pages/index");
      })
      .catch(function (e) {
        res.status(500).json({ message: e });
      });
  });
};

exports.userLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username })
    .then(function (userData) {
      if (userData === null) {
        return res.status(401).json({ message: "Invalid credentials!!" });
      }
      bcrypt.compare(password, userData.password, function (err, result) {
        if (result === false) {
          return res.status(401).json({ message: "Invalid credentials!!" });
        }

        return res.status(200).json({
          message: "Auth succcessssssssss!",
        });
      });
    })
    .catch(function (e) {
      res.status(500).json({ message: e });
    });
};
