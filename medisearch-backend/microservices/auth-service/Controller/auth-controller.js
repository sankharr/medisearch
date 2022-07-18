const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const dbConnection = require("../dbConfig");

// registering the user
const userRegister = async (req, res) => {
  await dbConnection();
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.json({ message: "User already exists" });
  } else {
    let newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      userType: req.body.userType,
    });
    newUser.save((err, result) => {
      if (err) console.log("error occured when saving auth doc - ", err);
    });

    return res.json(newUser);
  }
};


// user login
const userLogin = async (req, res) => {
  await dbConnection();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User doesn't exist" });
  } else {
    if (password !== user.password) {
      return res.json({ message: "Password Incorrect" });
    }
    const payload = {
      email,
      name: user.name,
      docID: user._id,
      userType: user.userType,
    };
    jwt.sign(payload, "secret", (err, token) => {
      if (err) console.log(err);
      else return res.json({ ...payload, token: token });
    });
  }
};


// getting all the user data
const getAllUsers = async (req, res) => {
  await dbConnection();
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

const testAPI = async (req, res) => {
  return res.send("<h3>Test API works!!</h3>");
};

exports.userRegister = userRegister;
exports.userLogin = userLogin;
exports.testAPI = testAPI;
exports.getAllUsers = getAllUsers;
