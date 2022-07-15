const Pharmacy = require("../Model/Pharmacy");
const amqp = require("amqplib");

var channel, connection;

// getting all pharmacy data
const getAllPharmacies = async (req, res) => {
  let pharmacies;

  try {
    pharmacies = await Pharmacy.find();
  } catch (err) {
    console.log("An error occured while retrieving pharmacy data - ", err);
  }

  if (!pharmacies) {
    res.status(404).json({ message: "No data returned" });
  }

  res.status(200).json(pharmacies);
};

function createPharmacy(data) {
  const newPharmacy = new Pharmacy({
    _id: data.documentID,
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    city: data.city,
    district: data.district,
    address: data.address,
  });
  newPharmacy.save((err, res) => {
    if (err) console.log("error occured when creating pharmacy doc - ", err);
    else {
      console.log("Successfully created pharmacyDoc from pharmacy-service");
    }
  });
  return newPharmacy;
}

async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("PHARMACY");
}
connect().then(() => {
  channel.consume("PHARMACY", (data) => {
    console.log("Consuming from Pharmacy service");
    console.log("json data - ", JSON.parse(data.content));
    const newPharmacy = createPharmacy(JSON.parse(data.content));
    channel.ack(data);
    channel.sendToQueue("AUTH", Buffer.from(JSON.stringify({ newPharmacy })));
  });
});

exports.getAllPharmacies = getAllPharmacies;
