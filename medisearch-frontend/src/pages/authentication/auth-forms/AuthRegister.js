import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

import axios from "axios";

// project import
import FirebaseSocial from "./FirebaseSocial";
import AnimateButton from "components/@extended/AnimateButton";
import { strengthColor, strengthIndicator } from "utils/password-strength";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "../../../../node_modules/react-router/index";

const URL = "http://localhost:4040/auth/register";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = ({setSubmitCompleted, setIsError}) => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

//   const [submitCompleted, setSubmitCompleted] = useState(false);
//   const [isError, setIsError] = useState(false);

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
        name: formObject.firstname+' '+formObject.lastname,
        email: formObject.email,
        phoneNumber: formObject.phoneNumber,
        city: formObject.city,
        password: formObject.password
    };

    axios
      .post(URL, dataObject)
      .then((res) => {
        console.log(res.data);
        console.log("Reservation successfully updated");
        setSubmitCompleted(true);
        setIsError(false);
        // setTimeout(() => navigate('/login'),2000)
        // console.log("is error state (then) => ", isError);
      })
      .catch((error) => {
        console.log(error);
        setSubmitCompleted(true);
        setIsError(true);
        // console.log("is error state (catch) => ", isError);
      });

    // Redirect to Student List
    // navigate("/currentReservations");
  };

  useEffect(() => {
    changePassword("");
  }, []);

  return (
    <>
      

        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            phoneNumber: "",
            city: "",
            district: "",
            email: "",
            password: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            firstname: Yup.string().max(255).required("First Name is required"),
            lastname: Yup.string().max(255).required("Last Name is required"),
            phoneNumber: Yup.number().required("Phone Number is required"),
            city: Yup.string().max(255).required("City is required"),
            district: Yup.string().max(255).required("District is required"),
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
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
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">
                      First Name*
                    </InputLabel>
                    <OutlinedInput
                      id="firstname-login"
                      type="firstname"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="John"
                      fullWidth
                      error={Boolean(touched.firstname && errors.firstname)}
                    />
                    {touched.firstname && errors.firstname && (
                      <FormHelperText error id="helper-text-firstname-signup">
                        {errors.firstname}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="lastname-signup">
                      Last Name*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.lastname && errors.lastname)}
                      id="lastname-signup"
                      type="lastname"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Doe"
                      inputProps={{}}
                    />
                    {touched.lastname && errors.lastname && (
                      <FormHelperText error id="helper-text-lastname-signup">
                        {errors.lastname}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="phoneNumber-signup">
                      Phone Number*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      id="phoneNumber-signup"
                      value={values.phoneNumber}
                      name="phoneNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="07XXXXXXXX"
                      inputProps={{}}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <FormHelperText error id="helper-text-phoneNumber-signup">
                        {errors.phoneNumber}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="city-signup">City*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.city && errors.city)}
                      id="city-login"
                      value={values.city}
                      name="city"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Nugegoda"
                      inputProps={{}}
                    />
                    {touched.city && errors.city && (
                      <FormHelperText error id="helper-text-city-signup">
                        {errors.city}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="district-signup">
                      District*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="district-signup"
                      value={values.district}
                      name="district"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Colombo"
                      inputProps={{}}
                    />
                    {touched.district && errors.district && (
                      <FormHelperText error id="helper-text-district-signup">
                        {errors.district}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-signup">
                      Email Address*
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="demo@company.com"
                      inputProps={{}}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email-signup">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password-signup"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="******"
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box
                          sx={{
                            bgcolor: level?.color,
                            width: 85,
                            height: 8,
                            borderRadius: "7px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    By Signing up, you agree to our &nbsp;
                    <Link variant="subtitle2" component={RouterLink} to="#">
                      Terms of Service
                    </Link>
                    &nbsp; and &nbsp;
                    <Link variant="subtitle2" component={RouterLink} to="#">
                      Privacy Policy
                    </Link>
                  </Typography>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
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
                      Create Account
                    </Button>
                  </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider>
                    <Typography variant="caption">Sign up with</Typography>
                  </Divider>
                </Grid>
                <Grid item xs={12}>
                  <FirebaseSocial />
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
  
    </>
  );
};

export default AuthRegister;
