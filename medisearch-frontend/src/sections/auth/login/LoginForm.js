import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';

import axios from "axios";

// redux
import { useDispatch } from 'react-redux';
import { updateLogin } from "../../../store/reducers/authdata";

// ----------------------------------------------------------------------

const URL = "http://localhost:4040/auth/login";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
        console.log("form data - ", formik.values)
        login(formik.values)
    //   navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const login = (formData) => {
    axios
      .post(URL, formData)
      .then((res) => {
        console.log(res.data);
        console.log("Successfully logged in");
        dispatch(updateLogin({name: res.data.name, email: res.data.email, token: res.data.token, userDocID: res.data.docID }))
        // document.cookie = `name=${res.data.name};`;
        // document.cookie = `email=${res.data.email};`;
        // document.cookie = `token=${res.data.token};`;
        // document.cookie = `userDocID=${res.data.docID};`;
        sessionStorage.setItem("name", res.data.name)
        sessionStorage.setItem("email", res.data.email)
        sessionStorage.setItem("token", res.data.token)
        sessionStorage.setItem("userDocID", res.data.docID)

        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
          console.log(error);
        //   setSubmitCompleted(true);
        //   setIsError(true);
      });
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
