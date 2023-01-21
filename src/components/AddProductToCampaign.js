import { useEffect, useState } from "react";
import * as React from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Button,
  Modal,
} from "@mui/material";
import { useSelector } from "react-redux";
import { addProductToCampaign, getAllCampaigns } from "../api/backendRequests";
import { useSnackbar } from "notistack";
import { Stack } from "@mui/system";
import { number } from "prop-types";

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

export default function AddProductToCampaign({ open, onClose, product }) {
  const token = useSelector((state) => state.user.accessToken);
  const { enqueueSnackbar } = useSnackbar();

  const [discountPercent, setDiscountPercent] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const allCampaigns = () => {
    getAllCampaigns()
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    allCampaigns();
  }, []);

  const closeOut = () => {
    if (!product) {
      setDiscountPercent("");
      setSelectedCampaign([]);
    }
    onClose();
  };

  const addProductToSelectedCampaign = () => {
    const productToAdd = [
      {
        id: product.id,
        discountPercent: discountPercent,
      },
    ];
    addProductToCampaign(productToAdd, selectedCampaign, token)
      .then((response) => {
        enqueueSnackbar("Product Added Successfully", { variant: "success" });
        closeOut();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeOut}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <TextField
              id="discountPercent"
              label="Discount Percent"
              onChange={(event) => setDiscountPercent(event.target.value)}
              value={discountPercent}
              type={number}
            />

            <FormControl fullWidth>
              <InputLabel>Cmpaigns</InputLabel>
              <Select
                id="campaign"
                name="campaign"
                value={selectedCampaign}
                label="campaign"
                onChange={(event) => setSelectedCampaign(event.target.value)}
              >
                {campaigns.map((campaign) => {
                  return (
                    <MenuItem key={campaign.id} value={campaign.name}>
                      {campaign.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div style={{ display: "grid", placeItems: "center" }}>
              <Button
                variant="contained"
                onClick={addProductToSelectedCampaign}
              >
                Add Product To Campaign
              </Button>
            </div>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
