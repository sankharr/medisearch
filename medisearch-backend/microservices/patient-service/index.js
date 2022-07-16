const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// const dotenv = require("dotenv");
// const PORT = process.env.PORT_ONE || 5050;
// const path = require("path");
const patientRouter = require("./Routes/patient-routes");

// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());

app.use("/patient", patientRouter);

module.exports.handler = serverless(app);
