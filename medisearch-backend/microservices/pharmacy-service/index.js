const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 9090;
const path = require("path");
const Reservation = require("./Pharmacy");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
const isAuthenticated = require("../../isAuthenticated");
var order;

var channel, connection;

const app = express();
app.use(cors())
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());
// app.configure(function() {
//     app.use(allowCrossDomain);
//     //some other code
// });  


app.get("/reservation", async (req, res) => {
  let reservations;
  try {
    reservations = await Reservation.find();
  } catch (error) {
    console.log(err);
  }

  if (!reservations) {
    return res.status(404).json({ message: "No reservations found" });
  }
//   console.log("reservations - ",reservations)
  return res.status(200).json({ reservations });
});


function createReservation(data) {
  const newOrder = new Reservation({
    itemName: data.itemName,
    startDate: data.startDate,
    endDate: data.endDate,
    days: data.days,
    amount: data.amount,
    quantity: data.quantity,
    customerName: data.customerName,
    eventColor: data.eventColor,
    status: data.status,
  });
  newOrder.save();
  return newOrder;
}

async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("RESERVATION");
}
connect().then(() => {
  channel.consume("RESERVATION", (data) => {
    console.log("Consuming from Reservation service");
    console.log("json data - ", JSON.parse(data.content));
    const newReservation = createReservation(JSON.parse(data.content));
    channel.ack(data);
    channel.sendToQueue(
      "PRODUCT",
      Buffer.from(JSON.stringify({ newReservation }))
    );
  });
});

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// connecting to MongoDB
mongoose.connect(
  process.env.CONNECTION_URL_RESERVATION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Reservation-Service DB Connected`);
  }
);

app.listen(PORT, () => {
  console.log(`Reservation-Service at ${PORT}`);
});
