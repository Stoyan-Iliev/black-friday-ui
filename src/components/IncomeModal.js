import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField, Alert, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { getIncome } from "../api/backendRequests";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers";

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

function getCorrectFormat(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
}

function getCorrectDateFormat(date) {
  const arr = date.split("-");
  return `${arr[1]}/${arr[2]}/${arr[0]}`;
}

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

export default function IncomeModal({ open, onClose }) {
  const token = useSelector((state) => state.user.accessToken);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [income, setIncome] = useState(null);
  const [validations, setValidations] = useState(getDefaultValidations());
  const [errorMessage, setErrorMessage] = useState("");
  const closeOut = () => {
    setStartDate("");
    setEndDate("");
    setIncome(null);
    setErrorMessage("");
    onClose();
  };

  const getIncomeForDates = () => {
    setIncome(null);
    const parsedStartDate = `${startDate.$y}-${getCorrectFormat(
      startDate.$m + 1
    )}-${getCorrectFormat(startDate.$D)}`;
    const parsedEndDate = `${endDate.$y}-${getCorrectFormat(
      endDate.$m + 1
    )}-${getCorrectFormat(endDate.$D)}`;
    getIncome(parsedStartDate, parsedEndDate, token)
      .then((response) => {
        setIncome(response.data);
        setErrorMessage("");
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
      <Modal
        open={open}
        onClose={closeOut}
        aria-labelledby="Create Campaign"
        style={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <Grid
            container
            style={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <Stack spacing={2}>
              <h3 style={{ textAlign: "center" }}>Calculate Store Income</h3>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  format="yyyy-MM-dd"
                  onChange={(startDate) => {
                    setStartDate(startDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(endDate) => {
                    setEndDate(endDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                {errorMessage ? (
                  <Alert severity="error">{errorMessage}</Alert>
                ) : null}
              </LocalizationProvider>
              {income ? (
                <>
                  <Box
                    style={{
                      maxHeight: "40vh",
                      overflow: "auto",
                      width: "fitContent",
                    }}
                  >
                    {income.dayIncome.map((i) => {
                      return (
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography variant="h6">
                              {getCorrectDateFormat(i.date)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} textAlign="right">
                            <Typography variant="h6" pr={"10px"}>
                              {i.income.toFixed(2)} lv
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Box>
                  <Grid item>
                    <Typography variant="h6">
                      Total Income: {income.totalIncome.toFixed(2)} lv
                    </Typography>
                  </Grid>
                </>
              ) : null}

              <Grid
                item
                style={{
                  display: "grid",
                  placeItems: "center",
                  marginTop: "16px",
                }}
              >
                <Button variant="contained" onClick={getIncomeForDates}>
                  Calculate Income
                </Button>
              </Grid>
            </Stack>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
