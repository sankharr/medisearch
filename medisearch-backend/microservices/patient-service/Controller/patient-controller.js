const Patient = require("../Model/Patient");
const amqp = require("amqplib");
const dbConnection = require("../dbConfig");

var channel, connection;

// route to get all patients
const getAllPatients = async (req, res) => {
  await dbConnection();
  let patients;
  try {
    patients = await Patient.find();
  } catch (error) {
    console.log(err);
  }

  if (!patients) {
    return res.status(404).json({ message: "No patients found" });
  }
  // console.log("products - ",products)
  return res.status(200).json({ patients });
};

//  route to get patient by id
const getPatient = async (req, res) => {
  await dbConnection();
  const id = req.params.id;
  let patient;
  try {
    patient = await Patient.findById(id);
  } catch (error) {
    console.log(err);
  }

  if (!patient) {
    return res.status(404).json({ message: "No patient found" });
  }
  return res.status(200).json({ patient });
};

// function to create the Product queue
async function connect(queueName) {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue(queueName);
}
// creating the product queue
connect("PATIENT")
  .then(() => {
    channel.consume("PATIENT", (data) => {
      console.log("Consuming from Patient service");
      console.log(
        "recieved data in PatientService - ",
        JSON.parse(data.content)
      );
      const requestType = JSON.parse(data.content).requestType;
      if (requestType === "createPatient") {
        const newPatient = createPatient(JSON.parse(data.content));
        channel.sendToQueue(
          "AUTH",
          Buffer.from(JSON.stringify({ newPatient }))
        );
        console.log("sent to AUTH queue from Patient");
        channel.ack(data);
        console.log("acknowledged from Patient");
      } else if (requestType === "dataForRequest") {
        gettingDataForRequest(JSON.parse(data.content)).then((res) => {
          console.log("dataForRequest => ", res);
          channel.sendToQueue("REQUEST", Buffer.from(JSON.stringify({ res })));
          console.log("sent Data to REQUEST queue from Patient");
          channel.ack(data);
          console.log("acknowledged from Patient");
        });
      }
    });
  })
  .catch((err) => console.log("error from amqp Connect - ", err));

const createPatient = (data) => {
  const newPatient = new Patient({
    _id: data.documentID,
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    city: data.city,
    district: data.district,
  });
  newPatient.save((err, res) => {
    if (err) console.log("error occured when creating patient doc - ", err);
    else {
      console.log("Successfully created patientDoc from patient-service");
    }
  });
  return newPatient;
};

const gettingDataForRequest = async (data) => {
  let patient;
  try {
    patient = await Patient.findById(data.requestorDocID);
  } catch (error) {
    console.log(err);
  }

  if (!patient) {
    return "No Patient Found";
  }
  console.log("Requested patient data found - ", patient);
  return patient;
};

const testAPI = async (req, res) => {
  return res.send("<h3>Patient-Service Test API works!!</h3>");
};

exports.getAllPatients = getAllPatients;
exports.getPatient = getPatient;
exports.testAPI = testAPI;
