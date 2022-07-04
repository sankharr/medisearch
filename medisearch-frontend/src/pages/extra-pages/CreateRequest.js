// material-ui
import { Typography, Input, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

// project import
import MainCard from "components/MainCard";
import OrderTable from "pages/dashboard/OrdersTable";

import { FileAddOutlined, SearchOutlined } from "@ant-design/icons";
import { Grid } from "../../../node_modules/@mui/material/index";

import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Link,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

import axios from "axios";

// project import
import FirebaseSocial from "../authentication/auth-forms/FirebaseSocial";
import AnimateButton from "components/@extended/AnimateButton";
import { strengthColor, strengthIndicator } from "utils/password-strength";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import AuthWrapper from "pages/authentication/AuthWrapper";

// ==============================|| SAMPLE PAGE ||============================== //

const CreateRequest = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const submitValues = (formObject) => {
    let dataObject = {
      name: formObject.firstname + " " + formObject.lastname,
      email: formObject.email,
      phoneNumber: formObject.phoneNumber,
      city: formObject.city,
      password: formObject.password,
    };

    axios
      .post(URL, dataObject)
      .then((res) => {
        console.log(res.data);
        console.log("Reservation successfully updated");
        // setSubmitCompleted(true);
        // setIsError(false);
        // console.log("is error state (then) => ", isError);
      })
      .catch((error) => {
        console.log(error);
        // setSubmitCompleted(true);
        // setIsError(true);
        // console.log("is error state (catch) => ", isError);
      });
  };

  return (
    // <AuthWrapper>
    <Grid container rowSpacing={4.5} columnSpacing={2.75} xs={12} lg={12}>
      {/* row 1 */}
      <Grid item sx={{ mb: -2.25 }}>
        <Typography variant="h5">Create Request</Typography>
      </Grid>
      {/* <Grid item xs={2}>
      <Button variant="contained" startIcon={<FileAddOutlined />}>
        Create Request
      </Button>
    </Grid> */}
      <Box sx={{ minHeight: "100vh" }}>
        {/* <AuthBackground /> */}
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={{
            minHeight: "100vh",
          }}
        >
          {/* <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
            <Logo />
          </Grid> */}
          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                minHeight: {
                  xs: "calc(100vh - 134px)",
                  md: "calc(100vh - 112px)",
                },
              }}
            >
              <Grid item>
                <MainCard
                  sx={{
                    maxWidth: { xs: 400, lg: 475 },
                    margin: { xs: 2.5, md: 3 },
                    "& > *": {
                      flexGrow: 1,
                      flexBasis: "50%",
                    },
                  }}
                  content={false}
                //   {...other}
                  border={false}
                  boxShadow
                  shadow={(theme) => theme.customShadows.z1}
                >
                  <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
                    <Formik
                      initialValues={{
                        medicineList: "",
                        submit: null,
                      }}
                      validationSchema={Yup.object().shape({
                        medicineList: Yup.string()
                          .min(1)
                          .required("List of Medicine is required")
                      })}
                      onSubmit={async (
                        values,
                        { setErrors, setStatus, setSubmitting }
                      ) => {
                        try {
                          setStatus({ success: false });
                          setSubmitting(false);
                          console.log("values", values);
                          submitValues(values);
                        } catch (err) {
                          console.error(err);
                          setStatus({ success: false });
                          setErrors({ submit: err.message });
                          setSubmitting(false);
                        }
                      }}
                    >
                      {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        touched,
                        values,
                      }) => (
                        <form noValidate onSubmit={handleSubmit}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                              <Stack spacing={1}>
                                <InputLabel htmlFor="medicineList">
                                  List of Medicines*
                                </InputLabel>
                                <OutlinedInput
                                  id="medicineList"
                                  type="medicineList"
                                  value={values.medicineList}
                                  name="medicineList"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  placeholder="Type......"
                                  fullWidth
                                  error={Boolean(
                                    touched.medicineList && errors.medicineList
                                  )}
                                  multiline
                                  rows={4}
                                />
                                {touched.medicineList && errors.medicineList && (
                                  <FormHelperText
                                    error
                                    id="helper-text-medicineList"
                                  >
                                    {errors.medicineList}
                                  </FormHelperText>
                                )}
                              </Stack>
                            </Grid>
                            {errors.submit && (
                              <Grid item xs={12}>
                                <FormHelperText error>
                                  {errors.submit}
                                </FormHelperText>
                              </Grid>
                            )}
                            <Grid item xs={12}>
                              <AnimateButton>
                                <Button
                                  disableElevation
                                  disabled={isSubmitting}
                                  fullWidth
                                  size="large"
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                >
                                  Submit Request
                                </Button>
                              </AnimateButton>
                            </Grid>
                          </Grid>
                        </form>
                      )}
                    </Formik>
                  </Box>
                </MainCard>
                {/* <OrderTable /> */}
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
            <AuthFooter />
          </Grid> */}
        </Grid>
      </Box>
    </Grid>
    // </AuthWrapper>
  );
};

export default CreateRequest;
