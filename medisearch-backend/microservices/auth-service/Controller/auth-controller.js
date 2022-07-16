const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const dbConnection = require("../dbConfig");

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
      else {
        const documentID = result._id.toString();
        if (req.body.userType == "Patient") {
          channel.sendToQueue(
            "PATIENT",
            Buffer.from(
              JSON.stringify({
                requestType: "createPatient",
                documentID,
                email: req.body.email,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                city: req.body.city,
                district: req.body.district,
              })
            )
          );
        } else if (req.body.userType == "Pharmacy") {
          try {
            console.log("About to send data to PHARMACY Queue");
            channel.sendToQueue(
              "PHARMACY",
              Buffer.from(
                JSON.stringify({
                  documentID,
                  email: req.body.email,
                  name: req.body.name,
                  phoneNumber: req.body.phoneNumber,
                  city: req.body.city,
                  district: req.body.district,
                  address: req.body.address,
                })
              )
            );
          } catch (err) {
            console.log(
              "An error occured while sending data to PHARMACY from Auth-Service",
              err
            );
          }
        }
        channel.consume("AUTH", (data) => {
          newUser = JSON.parse(data.content);
          console.log("Consuming recieved data in AUTH - ", newUser);
          channel.ack(data);
        });
      }
    });

    return res.json(newUser);
  }
};

const userLogin = async (req, res) => {
  //   res.set("Access-Control-Allow-Origin", "http://localhost:3000");
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

const getAllUsers = async (req, res) => {
  await dbConnection();
  //   console.log("getAllUsers --end")
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  // console.log("products - ",products)
  return res.status(200).json({ users });
};

const testAPI = async (req, res) => {
//   await dbConnection();
  return res.send("<h3>Test API works!!</h3>");
};

exports.userRegister = userRegister;
exports.userLogin = userLogin;
exports.testAPI = testAPI;
exports.getAllUsers = getAllUsers;
