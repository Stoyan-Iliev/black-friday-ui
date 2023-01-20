import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MainNavBar from "./MainNavBar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Hidden, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid";

import { signUp } from "../api/backendRequests";
import { useNavigate } from "react-router-dom";

function getDefaultValidations() {
  return {
      firstName: {
          error: false,
          message: ""
      },
      lastName: {
          error: false,
          message: ""
      },
      email: {
          error: false,
          message: ""
      },
      username: {
          error: false,
          message: ""
      },
      password: {
          error: false,
          message: ""
      },
      matchingPassword: {
          error: false,
          message: ""
      }
  }
}

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchingPassword, setMatchingPassword] = useState("");
  const [validations, setValidations] = useState(getDefaultValidations());

  let navigate = useNavigate();

  const signUpUser = () => {
    signUp({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
      matchingPassword: matchingPassword,
    })
      .then((response) => {
        navigate("../signIn", { replace: true });
      })
      .catch((error) => {
        handleValidations(error.response.data)
      });
  };

  const handleValidations = (validationResponse) => {
    let validations = getDefaultValidations();
    validationResponse.violations && validationResponse.violations.forEach(violaion => {
        validations[violaion.fieldName].error = true;
        validations[violaion.fieldName].message = violaion.message;
    });
    setValidations(validations);
  }

  return (
    <Container sx={{mt: 4}}>
      <Box
        component="form"
        sx={{
          // "& .MuiTextField-root": { m: 1 },
          marginLeft: 'auto',
          marginRight: 'auto',
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          maxWidth: "50rem",
        }}
        noValidate
        autoComplete="off"
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <Grid container spacing={2} sx={{mt: 1}}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="firstName"
              label="First Name"
              onChange={(event) => setFirstName(event.target.value)}
              error={validations.firstName.error}
              helperText={validations.firstName.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="LastName"
              onChange={(event) => setLastName(event.target.value)}
              error={validations.lastName.error}
              helperText={validations.lastName.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              onChange={(event) => setEmail(event.target.value)}
              error={validations.email.error}
              helperText={validations.email.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="username"
              label="Username"
              onChange={(event) => setUsername(event.target.value)}
              error={validations.username.error}
              helperText={validations.username.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              error={validations.password.error}
              helperText={validations.password.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="matchingPassword"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setMatchingPassword(event.target.value)}
              error={validations.matchingPassword.error}
              helperText={validations.matchingPassword.error}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ width: "15%", height: "3rem", mt: 3 }}
          onClick={signUpUser}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
