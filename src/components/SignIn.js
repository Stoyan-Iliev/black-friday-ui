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
    <div>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant="contained" onClick={signInUser}>
          Sign In
        </Button>
      </Box>
    </div>
  );
}
