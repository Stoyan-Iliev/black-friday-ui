import * as React from "react";
import {
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { verifyEmail } from '../api/backendRequests';

export default function EmailVerifiedPage() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    const sendVerificationRequest = () => {
        verifyEmail(code).then((response) => {
            if (response.data === "verify_success") {
                enqueueSnackbar('E-mail verified successfully', { variant: "success" });
                navigate("/signIn")
            } else {
                enqueueSnackbar('Error verifying e-mail', { variant: "error" });
            }
        });
    }
    
    return (
        <Container sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Typography variant="h3" sx={{maxWidth: "45rem", mt: "7rem"}}>Verify your e-mail to finish signing up for Black Friday Store</Typography>
            <Button variant="contained" onClick={sendVerificationRequest} sx={{height: "10rem", width: "20rem", fontSize: "2rem", m: "3rem"}}>Verify Email</Button>
        </Container>
    );
}