import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider, Formik } from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import axios from "axios";

// ----------------------------------------------------------------------

const URL = "http://localhost:4040/auth/register";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
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
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      city: "",
      district: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      try {
        // setStatus({ success: false });
        // setSubmitting(false);
        console.log("form values => ", values);
        submitValues(values);
      } catch (err) {
        console.error("form submission error => ", err);
        // setStatus({ success: false });
        // setErrors({ submit: err.message });
        // setSubmitting(false);
      }
      console.log("form values => ", values);
      //   navigate("/dashboard", { replace: true });
    },
  });

  const submitValues = (formObject) => {
    let dataObject = {
      name: formObject.firstname + " " + formObject.lastname,
      email: formObject.email,
      phoneNumber: formObject.phoneNumber,
      city: formObject.city,
      district: formObject.district,
      password: formObject.password,
    };

    axios
      .post(URL, dataObject)
      .then((res) => {
        console.log(res.data);
        console.log("Registration successfully completed");
        // setSubmitCompleted(true);
        // setIsError(false);
        // setTimeout(() => navigate('/login'),2000)
        // console.log("is error state (then) => ", isError);
      })
      .catch((error) => {
        console.log(error);
        // setSubmitCompleted(true);
        // setIsError(true);
        // console.log("is error state (catch) => ", isError);
      });

    // Redirect to Student List
    // navigate("/currentReservations");
  };

  //   const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
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
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="First name"
                id="firstname-login"
                value={values.firstname}
                name="firstname"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                fullWidth
                label="Last name"
                id="lastname-signup"
                value={values.lastname}
                name="lastname"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>

            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              name="email"
              label="Email address"
              id="email-login"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                id="password-signup"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              {/* <TextField
              fullWidth
              autoComplete="retype-password"
              type={showPassword ? "text" : "password"}
              label="Re-type Password"
              {...getFieldProps("Re-type Password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.retype_password && errors.retype_password)}
              helperText={touched.retype_password && errors.retype_password}
            /> */}
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="City"
                id="city-login"
                value={values.city}
                name="city"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.city && errors.city)}
                helperText={touched.city && errors.city}
              />

              <TextField
                fullWidth
                label="District"
                id="district-signup"
                value={values.district}
                name="district"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.district && errors.district)}
                helperText={touched.district && errors.district}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                label="Phone Number"
                id="phoneNumber-signup"
                value={values.phoneNumber}
                name="phoneNumber"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />

              {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            /> */}
            </Stack>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
          </Stack>
        </form>
      )}
    </Formik>
  );
}
