const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
const path = require("path");
const amqp = require("amqplib");
const requestRouter = require("./Routes/request-routes")

var channel, connection;

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

module.exports.handler = serverless(app);

