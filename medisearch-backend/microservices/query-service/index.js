const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 5050;
const path = require("path");
const Query = require("./Query");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
// const isAuthenticated = require("../../isAuthenticated");
var order;

var channel, connection;

const app = express();
app.use(cors());
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());

// route to get all patients
app.get("/query", async (req, res) => {
  let queries;
  try {
    queries = await Query.find();
  } catch (error) {
    console.log(err);
  }

  if (!queries) {
    return res.status(404).json({ message: "No queries found" });
  }
  // console.log("products - ",products)
  return res.status(200).json({ queries });
});

//  route to get patient by id
app.get("/query/:id", async (req, res) => {
  const id = req.params.id;
  let query;
  try {
    query = await Query.findById(id);
  } catch (error) {
    console.log(err);
  }

  if (!query) {
    return res.status(404).json({ message: "No query found" });
  }
  return res.status(200).json({ query });
});

// function to create the Product queue
async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("QUERY");
}
// creating the product queue
connect()
  .then(() => {
    channel.consume("QUERY", (data) => {
    //   console.log("Consuming from Patient service");
    //   console.log("json data - ", JSON.parse(data.content));
    //   const newPatient = createPatient(JSON.parse(data.content));
    //   channel.ack(data);
    //   console.log("acknowledged from Patient")
    //   channel.sendToQueue("AUTH", Buffer.from(JSON.stringify({ newPatient })));
    //   console.log("sent to AUTH queue from Patient");
    });
  })
  .catch((err) => console.log("error from amqp Connect - ", err));

const createPatient = (data) => {
  const newPatient = new Patient({
    _id: data.documentID,
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    city: data.city,
  });
  newPatient.save((err, res) => {
    if (err) console.log("error occured when creating patient doc - ",err);
    else{
        console.log("Successfully created patientDoc from patient-service")
    }
  });
  return newPatient;
};

// // route to reserve a product
// app.post("/product/reserve", async (req, res) => {
//   const {
//     itemName,
//     startDate,
//     endDate,
//     days,
//     amount,
//     quantity,
//     customerName,
//     eventColor,
//     status,
//   } = req.body;
//   channel.sendToQueue(
//     "RESERVATION",
//     Buffer.from(
//       JSON.stringify({
//         itemName,
//         startDate,
//         endDate,
//         days,
//         amount,
//         quantity,
//         customerName,
//         eventColor,
//         status,
//       })
//     )
//   );
// //   channel.consume("PRODUCT", (data) => {
// //     reservation = JSON.parse(data.content);
// //     console.log("Consuming data from PRODUCT - ", reservation);
// //   });
//   return res.json(order);
// });

// // route to create a product
// app.post("/product/create", async (req, res) => {
//   const { itemName, price, totalQuantity } = req.body;
//   const newProduct = new Product({
//     itemName,
//     price,
//     totalQuantity,
//   });
//   newProduct.save();
//   return res.json(newProduct);
// });

// connecting to MongoDB
mongoose.connect(
  process.env.CONNECTION_URL_PATIENT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Patient-Service DB Connected`);
  }
);

app.listen(PORT, () => {
  console.log(`Patient-Service at ${PORT}`);
});
