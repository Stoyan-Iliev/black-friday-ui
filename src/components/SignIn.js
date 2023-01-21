import { useState } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { signIn } from "../api/backendRequests";
import { sliceSignIn } from "../redux/features/UserSlice";
import MainNavBar from "./MainNavBar";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Hidden, Typography, Container, Alert } from "@mui/material";

function getDefaultValidations() {
  return {
    username: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  };
}

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState(getDefaultValidations());
  const [errorMessage, setErrorMessage] = useState("");

  const signInUser = () => {
    signIn({ username: username, password: password })
      .then((response) => {
        dispatch(sliceSignIn(response.data));
        navigate("/", { replace: true });
        setErrorMessage("");
      })
      .catch((error) => {
        handleValidations(error.response.data);
      });
  };

  const handleValidations = (validationResponse) => {
    let validations = getDefaultValidations();
    validationResponse.message
      ? setErrorMessage(
          validationResponse.message.replace("disabled", "not verified")
        )
      : setErrorMessage("");
    validationResponse.violations &&
      validationResponse.violations.forEach((violaion) => {
        validations[violaion.fieldName].error = true;
        validations[violaion.fieldName].message = violaion.message;
      });
    if (
      validationResponse.message &&
      validationResponse.message === "Bad credentials"
    ) {
      validations.username.error = true;
      validations.username.message = "Invalid credentials";
      validations.password.error = true;
      validations.password.message = "Invalid credentials";
    }
    setValidations(validations);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        component="form"
        sx={{
          // "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <TextField
          id="username"
          label="Username"
          sx={{ mt: 2 }}
          onChange={(event) => setUsername(event.target.value)}
          error={validations.username.error}
          helperText={validations.username.message}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{ mt: 2 }}
          onChange={(event) => setPassword(event.target.value)}
          error={validations.password.error}
          helperText={validations.password.message}
        />
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
        <Button variant="contained" onClick={signInUser} sx={{ mt: 2 }}>
          Sign In
        </Button>
      </Box>
    </Container>
  );
}
