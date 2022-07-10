import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
// material
import {
  Card,
  Stack,
  Container,
  Typography,
  TextField
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
// component

import axios from "axios";

// redux
import { useDispatch } from "react-redux";

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

const URL = "http://localhost:6060/requests"

export default function CreateRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const RequestSchema = Yup.object().shape({
    medicineList: Yup.string()
      .min(1, "Recheck the medicine list")
      .required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      medicineList: "",
    },
    validationSchema: RequestSchema,
    onSubmit: () => {
      console.log("form data - ", formik.values);
      createRequest(formik.values);
      //   navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const createRequest = (formData) => {
    const newRequestObject = {
      requestorName: sessionStorage.getItem("name"),
      requestorDocID: sessionStorage.getItem("userDocID"),
      email: sessionStorage.getItem("email"),
      phoneNumber: sessionStorage.getItem("phoneNumber"),
      city: sessionStorage.getItem("patientCity"),
      district: sessionStorage.getItem("patientDistrict"),
      medicineList: formData.medicineList,
    };
    axios
      .post(URL, newRequestObject)
      .then((res) => {
        console.log(res.data);
        // console.log("Successfully created the request");

        navigate("/requests", { replace: true });
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
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Create new request
          </Button> */}
        </Stack>

        <Card>
          {/* <RequestListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          <Container maxWidth="sm">
            <ContentStyle>
              {/* <Typography variant="h4" gutterBottom>
                Sign in to Minimal
              </Typography> */}
              <Scrollbar>
                <FormikProvider value={formik}>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3} sx={{ my: 2 }}>
                      <Label id="medicineList">List of Medicines</Label>
                      <TextField
                        multiline
                        rows={10}
                        placeholder="Type your list of medicines here.."
                        {...getFieldProps("medicineList")}
                        error={Boolean(
                          touched.medicineList && errors.medicineList
                        )}
                        helperText={touched.medicineList && errors.medicineList}
                      />
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ my: 2 }}
                    >
                      <LoadingButton
                        size="large"
                        type="submit"
                        variant="contained"
                        // sx={{ width: "20vw"}}
                        loading={isSubmitting}
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
