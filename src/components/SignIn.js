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
import { Avatar, Hidden, Typography, Container } from "@mui/material";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = () => {
    signIn({ username: username, password: password })
      .then((response) => {
        console.log(response.data);
        dispatch(sliceSignIn(response.data));
        navigate("/", { replace: true });
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container  sx={{mt: 4}}>
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
          sx={{mt: 2}}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{mt: 2}}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant="contained" onClick={signInUser} sx={{mt: 2}}>
          Sign In
        </Button>
      </Box>
    </Container>
  );
}
