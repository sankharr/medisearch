const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const patientRouter = require("./Routes/patient-routes");


app.use(express.json());

app.use("/patient", patientRouter);

module.exports.handler = serverless(app);
