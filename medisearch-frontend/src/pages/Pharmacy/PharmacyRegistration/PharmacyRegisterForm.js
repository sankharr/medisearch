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

// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// ----------------------------------------------------------------------

const URL = "http://localhost:4040/auth/register";

export default function PharmacyRegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const submitValues = (formObject) => {
    let dataObject = {
      name: formObject.name,
      email: formObject.email,
      phoneNumber: formObject.phoneNumber,
      city: formObject.city,
      district: formObject.district,
      password: formObject.password,
      address: formObject.address,
      userType: 'Pharmacy',
    };

    axios
      .post(URL, dataObject)
      .then((res) => {
        console.log(res.data);
        console.log("Registration successfully completed");
        // setSubmitCompleted(true);
        // setIsError(false);
        // setTimeout(() => navigate('/login'),2000)
        navigate("/login");
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
        name: "",
        phoneNumber: "",
        city: "",
        district: "",
        email: "",
        password: "",
        address: "",
        // location: "googleMapsLocation",
        // userType: "Pharmacy",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required("Name is required"),
        address: Yup.string().max(255).required("Address is required"),
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
                label="Name"
                id="name-register"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </Stack>

            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              name="email"
              label="Email address"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              name="address"
              label="Address"
              value={values.address}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
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
                id="city-register"
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
                // fullWidth
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
