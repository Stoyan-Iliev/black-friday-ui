import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
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

const FullWidthTextField = styled(TextField)(() => ({
  width: "100%",
}));

export default function CreateCampaignModal({ open, onClose }) {
  const token = useSelector((state) => state.user.accessToken);

  const [name, setName] = useState("");
  const [campaignStart, setCampaignStart] = useState("");
  const [campaignEnd, setCampaignEnd] = useState("");

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
        console.log(response.data);
      })
      .catch((error) => console.log(error));

    closeOut();
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
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={2}>
              <DateTimePicker
                label="Start Campaign Time"
                renderInput={(params) => <TextField {...params} />}
                value={campaignStart}
                onChange={(newValue) => {
                  setCampaignStart(newValue);
                }}
              />
              <DateTimePicker
                label="End Campaign Time"
                renderInput={(params) => <TextField {...params} />}
                value={campaignEnd}
                onChange={(newValue) => {
                  setCampaignEnd(newValue);
                }}
              />
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
