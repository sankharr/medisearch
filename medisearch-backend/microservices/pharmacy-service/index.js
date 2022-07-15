const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT_ONE || 9090;
const path = require("path");
const pharmacyRoutes = require("./Routes/pharmacy-routes");

const app = express();
app.use(cors());
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());

app.use("/pharmacy", pharmacyRoutes);


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
