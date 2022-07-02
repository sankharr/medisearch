const express = require("express");
const mongoose = require("mongoose");
const PORT = 5000;
// const reservationRouter = require("./routes/reservation-routes");
// const deviceRouter = require("./routes/device-routes");
const cors = require("cors");
const dotenv = require("dotenv");
// const bodyParser = require('body-parser');
const app = express();
dotenv.config();
// Middlewares

//This will convert to json
app.use(express.json());
app.use(cors());
// app.use("/reservations", reservationRouter); // localhost:5000/reservations
// app.use("/devices", deviceRouter); // localhost:5000/devices

mongoose
  .connect(
    process.env.CONNECTION_URL
  )
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(PORT);
    console.log(`App running on ${PORT}`)
  })
  .catch((err) => console.log(err));