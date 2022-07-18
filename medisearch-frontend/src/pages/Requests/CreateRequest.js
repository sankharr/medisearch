import { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
  Card,
  Stack,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { LoadingButton } from "@mui/lab";
import Iconify from "../../components/Iconify";
// component

import axios from "axios";

// redux
import { useDispatch } from "react-redux";

// Table imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  //   maxWidth: 480,
  margin: "auto",
  //   minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(5, 0),
}));

// const Request_URL = "http://localhost:6060/requests";
// const Patient_URL = "http://localhost:5050/patient/";

export default function CreateRequest() {
  const Patient_URL = process.env.REACT_APP_REQUEST_CREATE_PATIENT_URL;
  const Request_URL = process.env.REACT_APP_REQUEST_CREATE_REQUEST_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const medNameField = useRef(null);
  //   let medicineList = [];
  const [medicineList, setMedicineList] = useState([]);

  useEffect(() => {}, [medicineList]);

  const RequestSchema = Yup.object().shape({
    medicineName: Yup.string()
      .min(1, "Recheck the medicine name")
      .required("This field is required"),
    quantity: Yup.number()
      .min(1, "Enter a valid number")
      .required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      medicineName: "",
      quantity: "",
    },
    validationSchema: RequestSchema,
    onSubmit: () => {
      createRequest();
    },
  });

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleAdd = (data) => {
    let currentData = medicineList;
    currentData.push({
      medicineName: data.medicineName,
      quantity: data.quantity,
    });
    setMedicineList(currentData);
    formik.resetForm();

    console.log("medicineList => ", medicineList);
  };

  const createRequest = async () => {
    const requestorName = sessionStorage.getItem("name");
    const requestorDocID = sessionStorage.getItem("userDocID");
    const email = sessionStorage.getItem("email");

    axios
      .get(Patient_URL + requestorDocID)
      .then(async (res) => {
        console.log("patient Data - ", res.data);
        await axios
          .post(Request_URL, {
            requestorName,
            requestorDocID,
            email,
            medicineList,
            phoneNumber: res.data.patient.phoneNumber,
            city: res.data.patient.city,
            district: res.data.patient.district,
          })
          .then((response) => {
            console.log(response.data);
            setMedicineList([]);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Create Request
          </Typography>
        </Stack>

        <Card>
          <Container maxWidth="sm">
            <ContentStyle>
              <Scrollbar>
                <FormikProvider value={formik}>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                      //   sx={{ my: 2 }}
                    >
                      <TextField
                        autoFocus
                        refs={medNameField}
                        placeholder="Medicine Name"
                        {...getFieldProps("medicineName")}
                        error={Boolean(
                          touched.medicineName && errors.medicineName
                        )}
                        helperText={touched.medicineName && errors.medicineName}
                      />
                      <TextField
                        placeholder="Quantity"
                        {...getFieldProps("quantity")}
                        error={Boolean(touched.quantity && errors.quantity)}
                        helperText={touched.quantity && errors.quantity}
                      />
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => handleAdd(formik.values)}
                      >
                        <Iconify icon="eva:plus-fill" />
                      </Button>
                    </Stack>
                    <Stack spacing={3} sx={{ my: 2 }}>
                      <Label id="medicineList">List of Medicines</Label>
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Medicine Name</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {medicineList.map((row) => (
                              <TableRow
                                key={row.medicineName}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.medicineName}
                                </TableCell>
                                <TableCell align="right">
                                  {row.quantity}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Stack>

                    {medicineList.length === 0 && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ my: 4 }}
                      >
                        <Typography variant="body1">
                          Medicine List is empty
                        </Typography>
                      </Stack>
                    )}

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ my: 2 }}
                    >
                      <LoadingButton
                        size="large"
                        // type="submit"
                        variant="contained"
                        // sx={{ width: "20vw"}}
                        loading={isSubmitting}
                        onClick={() => createRequest()}
                      >
                        Submit
                      </LoadingButton>
                    </Stack>
                  </Form>
                </FormikProvider>
              </Scrollbar>
            </ContentStyle>
          </Container>
        </Card>
      </Container>
    </Page>
  );
}
