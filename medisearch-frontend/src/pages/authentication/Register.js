import { Link } from "react-router-dom";

// material-ui
import {
  Grid,
  Stack,
  Typography,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";

// project import
import FirebaseRegister from "./auth-forms/AuthRegister";
import AuthWrapper from "./AuthWrapper";
import { useState } from "react";
import { CircularProgress } from "../../../node_modules/@mui/material/index";

// ================================|| REGISTER ||================================ //

const CompletetionAlert = (props) => {
  if (props.isError) {
    return (
      <Container sx={{ width: "20rem" }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Registration Failed!
        </Alert>
      </Container>
    );
  } else {
    return (
      <Grid container sx={{ width: "20rem" }} spacing={2}>
        <Grid item xs={12}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Registration Successful!
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Grid item xs={1}>
              <CircularProgress size={25} />
            </Grid>
            <Grid item xs={10}>
              Redirecting to Login...
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    );
  }
};

const Register = () => {
  const [submitCompleted, setSubmitCompleted] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <AuthWrapper>
      {submitCompleted ? (
        isError ? (
          <CompletetionAlert isError={true} />
        ) : (
          <CompletetionAlert isError={false} />
        )
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ mb: { xs: -0.5, sm: 0.5 } }}
            >
              <Typography variant="h3">Sign up</Typography>
              <Typography
                component={Link}
                to="/login"
                variant="body1"
                sx={{ textDecoration: "none" }}
                color="primary"
              >
                Already have an account?
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <FirebaseRegister
              setSubmitCompleted={setSubmitCompleted}
              setIsError={setIsError}
            />
          </Grid>
        </Grid>
      )}
    </AuthWrapper>
  );
};

export default Register;
