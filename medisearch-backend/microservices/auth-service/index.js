const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 4040;
const path = require("path");
const User = require("./User.js");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
const { json } = require("body-parser");
// const env = require("../../.env")

const app = express();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
// Middlewares

//This will convert to json
app.use(express.json());
app.use(cors());

// creating and initializing rabbitmq queue
async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("AUTH");
}
connect().catch((err) => console.log("error from amqp Connect - ", err));

app.post("/auth/register", async (req, res) => {
  const { email, password, name, phoneNumber, city } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ message: "User already exists" });
  } else {
    let newUser = new User({
      email,
      name,
      password,
    });
    newUser.save((err, result) => {
      if (err) console.log("error occured when saving auth doc - ", err);
      else {
        const documentID = result._id.toString();
        channel.sendToQueue(
          "PATIENT",
          Buffer.from(
            JSON.stringify({
              documentID,
              email,
              name,
              phoneNumber,
              city,
            })
          )
        );
        channel.consume("AUTH", (data) => {
          newUser = JSON.parse(data.content);
          console.log("Consuming return data from AUTH - ", newUser);
          channel.ack(data);
        });
        //   return res.json(order);
        // console.log("auth doc saved - ", result._id.toString())
      }
    });
    // const dataObject = res.json(newUser);

    return res.json(newUser);
  }
});

app.post("/auth/login", async (req, res) => {
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
    };
    jwt.sign(payload, "secret", (err, token) => {
      if (err) console.log(err);
      else return res.json({ token: token });
    });
  }
});

mongoose.connect(
  process.env.CONNECTION_URL_AUTH,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Auth-Service DB Connected`);
  }
);

app.listen(PORT, () => {
  console.log(`Auth-Service at ${PORT}`);
});
