//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = {
  email: String,
  password: String,
};
const User = new mongoose.model("User", userSchema);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ email: username }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
          console.log(foundUser);
        }
      }
    }
  });
});

let PORT = 3000;
app.listen(3000, function () {
  console.log("listening on port " + PORT);
});
