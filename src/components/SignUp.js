import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MainNavBar from "./MainNavBar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Hidden, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { signUp } from "../api/backendRequests";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchingPassword, setMatchingPassword] = useState("");

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
        console.log(response.data);
        navigate("../signIn", { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
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
          Sign up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "75%", float: "right" }}
              id="firstName"
              label="First Name"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "75%", float: "left" }}
              id="lastName"
              label="LastName"
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "75%", float: "right" }}
              id="email"
              label="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "75%", float: "left" }}
              id="username"
              label="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "75%", float: "right" }}
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: "75%", float: "left" }}
              id="matchingPassword"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setMatchingPassword(event.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ width: "15%", height: "3rem" }}
          onClick={signUpUser}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
}
