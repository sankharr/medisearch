const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
mongoose.Promise = global.Promise;

const connectToDatabase = async () => {
  let isConnected;
  if (isConnected) {
    console.log('using existing database connection');
    return Promise.resolve();
  }

  console.log('using new database connection');
  const database = await mongoose.connect(process.env.CONNECTION_URL_PATIENT, {useNewUrlParser: true});
  isConnected = database.connections[0].readyState;
  // return isConnected;
};

module.exports = connectToDatabase;
