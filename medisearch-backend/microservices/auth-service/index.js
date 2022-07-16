const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({
    origin: "http://localhost:3000"
}));
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 4040;
const path = require("path");
const amqp = require("amqplib");
const authRouter = require("./Routes/auth-routes");
const db = require("./dbConfig");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

//This will convert to json
app.use(express.json());

// creating and initializing rabbitmq queue
async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("AUTH");
}
connect().catch((err) => console.log("error from amqp Connect - ", err));

app.use("/auth", authRouter);

module.exports.handler = serverless(app);
