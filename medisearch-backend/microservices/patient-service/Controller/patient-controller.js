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

const createPatient = async (req, res) => {
  await dbConnection();
  console.log("req.body => ", req.body);
  const newPatient = new Patient({
    _id: req.body.documentID,
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    district: req.body.district,
  });
  await newPatient.save((err, res) => {
    if (err) console.log("error occured when creating patient doc - ", err);
    else {
      console.log("Successfully created patientDoc from patient-service");
    }
  });
  return res.json(newPatient);
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
exports.createPatient = createPatient;
