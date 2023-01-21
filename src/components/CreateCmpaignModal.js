import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField, Alert } from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { createCampaign } from "../api/backendRequests";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  justifyItems: "center",
};

function getDefaultValidations() {
  return {
    name: {
      error: false,
      message: "",
    },
    campaignStart: {
      error: false,
      message: "",
    },
    campaignEnd: {
      error: false,
      message: "",
    },
  };
}

const FullWidthTextField = styled(TextField)(() => ({
  width: "100%",
}));

export default function CreateCampaignModal({ open, onClose }) {
  const token = useSelector((state) => state.user.accessToken);

  const [name, setName] = useState("");
  const [campaignStart, setCampaignStart] = useState("");
  const [campaignEnd, setCampaignEnd] = useState("");
  const [validations, setValidations] = useState(getDefaultValidations());
  const [errorMessage, setErrorMessage] = useState("");
  const closeOut = () => {
    setName("");
    setCampaignStart("");
    setCampaignEnd("");
    onClose();
  };

  const addCampaign = () => {
    createCampaign(
      {
        name: name,
        campaignStart: campaignStart,
        campaignEnd: campaignEnd,
      },
      token
    )
      .then((response) => {
        closeOut();
      })
      .catch((error) => {
        handleValidations(error.response.data);
      });
  };

  const handleValidations = (validationResponse) => {
    validationResponse.message
      ? setErrorMessage(validationResponse.message)
      : setErrorMessage("");
    let validations = getDefaultValidations();
    validationResponse.violations &&
      validationResponse.violations.forEach((violaion) => {
        validations[violaion.fieldName].error = true;
        validations[violaion.fieldName].message = violaion.message;
      });
    setValidations(validations);
  };

  return (
    <div>
      <Modal open={open} onClose={closeOut} aria-labelledby="Create Campaign">
        <Box sx={style}>
          <h3 style={{ textAlign: "center" }}>Create Campaign</h3>
          <FullWidthTextField
            id="name"
            label="Campaign Name"
            sx={{ marginBottom: "16px" }}
            onChange={(event) => setName(event.target.value)}
            error={validations.name.error}
            helperText={validations.name.message}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2}>
              <DateTimePicker
                label={
                  !validations.campaignStart.error
                    ? "Start Campaign Time"
                    : validations.campaignStart.message
                }
                renderInput={(params) => <TextField {...params} />}
                value={campaignStart}
                onChange={(newValue) => {
                  setCampaignStart(newValue);
                }}
              />
              <DateTimePicker
                label={
                  !validations.campaignEnd.error
                    ? "End Campaign Time"
                    : validations.campaignEnd.message
                }
                renderInput={(params) => <TextField {...params} />}
                value={campaignEnd}
                onChange={(newValue) => {
                  setCampaignEnd(newValue);
                }}
              />
              {console.log(errorMessage)}
              {errorMessage ? (
                <Alert severity="error">{errorMessage}</Alert>
              ) : null}
            </Stack>
          </LocalizationProvider>
          <div
            style={{ display: "grid", placeItems: "center", marginTop: "16px" }}
          >
            <Button variant="contained" onClick={addCampaign}>
              Add Campaign
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
