import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { makePurchase } from "../api/backendRequests";
import { Grid } from "@mui/material";

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

export default function AddProduct({ open, onClose }) {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.product);

  const [address, setAddress] = useState("");

  const closeOut = () => {
    setAddress("");
    onClose();
  };

  const BorderlessTableCell = styled(TableCell)(() => ({
    borderBottom: "none",
  }));

  const finishPurchase = () => {
    const productIDs = products.map((product) => {
      return { id: product.id, count: 1 };
    });
    makePurchase(
      {
        boughtProducts: { productIDs },
        userId: user.id,
        address: address,
      },
      user.accessToken
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));

    closeOut();
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
          <h3 style={{ textAlign: "center" }}>Add New Product</h3>
          {products.map((product) => {
            console.log(product);
            return (
              <Card sx={{ maxWidth: 200, margin: "5px" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrls && product.imageUrls[0]}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={8}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      component="h6"
                      sx={{
                        textAlign: "left",
                        verticalAlign: "center",
                        paddingLeft: "10px",
                        color: "red",
                      }}
                    >
                      {(Math.round(product.price * 100) / 100).toFixed(2)} лв.
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            );
          })}
          <BorderlessTableCell>
            <FullWidthTextField
              id="address"
              label="Dellivery Address"
              onChange={(event) => setAddress(event.target.value)}
            />
          </BorderlessTableCell>
          <div style={{ display: "grid", placeItems: "center" }}>
            <Button variant="contained" onClick={finishPurchase}>
              Finish Order
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
