const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 6060;
const path = require("path");
const amqp = require("amqplib");
const requestRouter = require("./Routes/request-routes")
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

app.use("/requests", requestRouter);

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
