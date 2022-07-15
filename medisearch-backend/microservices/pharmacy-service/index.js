const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 9090;
const path = require("path");
// const Reservation = require("./Pharmacy");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
// const isAuthenticated = require("../../isAuthenticated");
const Pharmacy = require("./Pharmacy");
var order;

var channel, connection;

const app = express();
app.use(cors());
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());
// app.configure(function() {
//     app.use(allowCrossDomain);
//     //some other code
// });

// getting all pharmacy data
app.get("/pharmacy", async (req, res) => {
  let pharmacies;

  try {
    pharmacies = await Pharmacy.find();
  } catch (err) {
    console.log("An error occured while retrieving pharmacy data - ", err);
  }

  if (!pharmacies) {
    res.status(404).json({ message: "No data returned" });
  }

  res.status(200).json(pharmacies);
});

app.post("/pharmacy", (req, res) => {
  const { dataObject } = req.body;

  const newPharmacy = new Pharmacy(dataObject);

  newPharmacy.save();

  return newPharmacy;
});

function createPharmacy(data) {
  const newPharmacy = new Pharmacy({
    _id: data.documentID,
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    city: data.city,
    district: data.district,
    address: data.address,
  });
  newPharmacy.save((err, res) => {
    if (err) console.log("error occured when creating pharmacy doc - ", err);
    else {
      console.log("Successfully created pharmacyDoc from pharmacy-service");
    }
  });
  return newPharmacy;
}

async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("PHARMACY");
}
connect().then(() => {
  channel.consume("PHARMACY", (data) => {
    console.log("Consuming from Pharmacy service");
    console.log("json data - ", JSON.parse(data.content));
    const newPharmacy = createPharmacy(JSON.parse(data.content));
    channel.ack(data);
    channel.sendToQueue(
      "AUTH",
      Buffer.from(JSON.stringify({ newPharmacy }))
    );
  });
});

// let allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

// connecting to MongoDB
mongoose.connect(
  process.env.CONNECTION_URL_PHARMA,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Pharmacy-Service DB Connected`);
  }
);

app.listen(PORT, () => {
  console.log(`Pharmacy-Service at ${PORT}`);
});
