import * as React from "react";
import {
  Box,
  Button,
  Avatar,
  Container,
  Typography,
  Stack,
  Grid,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

export default function AccountPage() {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user);
  const role = user.roles.includes("ROLE_ADMIN")
    ? "Administrator"
    : user.roles.includes("ROLE_EMPLOYEE")
    ? "Employee"
    : "Client";

  const resetPasswordButtonClick = () => {
    enqueueSnackbar("Password Reset e-mail sent", { variant: "success" });
  };

  return (
    <Container sx={{}}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar sx={{ m: 5, width: 200, height: 200 }} />
      </Box>
      <Paper elevation={3} sx={{ mx: "10rem" }}>
        <Grid container spacing={2} sx={{ p: 3, pb: 5 }}>
          <Grid item xs={6}>
            <Stack sx={{ display: "flex", alignItems: "flex-end" }}>
              <Typography>username:</Typography>
              <Typography>e-mail:</Typography>
              <Typography>role:</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack sx={{ display: "flex", alignItems: "flex-start" }}>
              <Typography>{user.username}</Typography>
              <Typography>{user.email}</Typography>
              <Typography>{role}</Typography>
            </Stack>
          </Grid>
          {/* <Grid xs={12} sx={{ my: "3rem" }}> */}
          {/* <Button
              variant="outlined"
              color="error"
              onClick={resetPasswordButtonClick}
            >
              Reset Password
            </Button> */}
          {/* </Grid> */}
        </Grid>
      </Paper>
    </Container>
  );
}
