const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({
    origin: "http://localhost:3000"
}));
const dotenv = require("dotenv");
const path = require("path");
const authRouter = require("./Routes/auth-routes");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(express.json());
app.use("/auth", authRouter);

module.exports.handler = serverless(app);
