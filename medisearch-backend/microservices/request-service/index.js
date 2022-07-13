const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 6060;
const path = require("path");
const Request = require("./Request");
const amqp = require("amqplib");
const { Console } = require("console");
// const isAuthenticated = require("../../isAuthenticated");
var order;

var channel, connection;

const app = express();
app.use(cors());
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());

// function to create the Product queue
async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("REQUEST");
}

// creating the product queue
connect().catch((err) =>
  console.log("error from REQUEST amqp Connect - ", err)
);

// route to get all requests
app.get("/requests", async (req, res) => {
  let requests;
  try {
    requests = await Request.find();
  } catch (error) {
    console.log(err);
  }

  if (!requests) {
    return res.status(404).json({ message: "No queries found" });
  }
  // console.log("products - ",products)
  return res.status(200).json({ requests });
});

//  route to get requests by id
app.get("/requests/:id", async (req, res) => {
  const id = req.params.id;
  let request;
  try {
    request = await Request.findById(id);
  } catch (error) {
    console.log(err);
  }

  if (!request) {
    return res.status(404).json({ message: "No query found" });
  }
  return res.status(200).json({ request });
});

// function to create a request
app.post("/requests", async (req, res) => {
  let requestedData;
  const {
    requestorName,
    requestorDocID,
    email,
    medicineList,
    phoneNumber,
    city,
    district,
  } = req.body;

  const requestorData = {
    docID: requestorDocID,
    name: requestorName,
    phoneNumber,
    city,
    email,
    district,
    fulfilled: false,
  };


  for (item of medicineList) {
    const newRequest = new Request({
      medicineName: item.medicineName,
      quantity: item.quantity,
      requestorData,
    });

    newRequest.save((err, result) => {
      if (err) console.log("error occured when saving request doc - ", err);
      else {
        console.log("patient doc saved - ", newRequest.medicineName);
      }
    });
  }
  
  return res.json({
    message: "Successfully completed creating the request (JSON)",
  });
});

// connecting to MongoDB
mongoose.connect(
  process.env.CONNECTION_URL_REQUEST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Request-Service DB Connected`);
  }
);

app.listen(PORT, () => {
  console.log(`Request-Service at ${PORT}`);
});
