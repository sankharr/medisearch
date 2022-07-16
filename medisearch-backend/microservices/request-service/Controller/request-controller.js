const Request = require("../Model/Request");
const dbConnection = require("../dbConfig");

// route to get all requests
const getAllRequests = async (req, res) => {
  await dbConnection();
  let requests;
  try {
    requests = await Request.find();
  } catch (error) {
    console.log(err);
  }

  if (!requests) {
    return res.status(404).json({ message: "No queries found" });
  }
  // console.log("products - ",products)
  return res.status(200).json({ requests });
};

//  route to get requests by id
const getRequest = async (req, res) => {
  await dbConnection();
  const id = req.params.id;
  let request;
  try {
    request = await Request.findById(id);
  } catch (error) {
    console.log(err);
  }

  if (!request) {
    return res.status(404).json({ message: "No query found" });
  }
  return res.status(200).json({ request });
};

// function to create a request
const createRequest = async (req, res) => {
  await dbConnection();
  let requestedData;
  const {
    requestorName,
    requestorDocID,
    email,
    medicineList,
    phoneNumber,
    city,
    district,
  } = req.body;

  const requestorData = {
    docID: requestorDocID,
    name: requestorName,
    phoneNumber,
    city,
    email,
    district,
    fulfilled: false,
  };

  for (item of medicineList) {
    const newRequest = new Request({
      medicineName: item.medicineName,
      quantity: item.quantity,
      requestorData,
    });

    newRequest.save((err, result) => {
      if (err) console.log("error occured when saving request doc - ", err);
      else {
        console.log("patient doc saved - ", newRequest.medicineName);
      }
    });
  }

  return res.json({
    message: "Successfully completed creating the request (JSON)",
  });
};

const testAPI = async (req, res) => {
  return res.send("<h3>Request-Service Test API works!!</h3>");
};

exports.getAllRequests = getAllRequests;
exports.getRequest = getRequest;
exports.createRequest = createRequest;
exports.testAPI = testAPI;
