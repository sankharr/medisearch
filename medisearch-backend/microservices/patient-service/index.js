const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 5050;
const path = require("path");
const patientRouter = require("./Routes/patient-routes");

const app = express();
app.use(cors());
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());

app.use("/patient", patientRouter);


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
