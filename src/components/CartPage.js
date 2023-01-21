import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { makePurchase } from "../api/backendRequests";
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, Link } from "react-router-dom";
import {
  changeProductCount,
  removeProduct,
  clearCart,
} from "../redux/features/CartSlice";
import { blue, blueGrey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import CustomSnackBar from "./CustomSnackBar";
//   const { enqueueSnackbar } = useSnackbar();
import { useSnackbar } from "notistack";

const style = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // width: "70%",
  // bgcolor: "background.paper",
  // border: "none",
  // boxShadow: 24,
  // p: 4,
  // justifyItems: "center",
};

function getDefaultValidations() {
  return {
    address: {
      error: false,
      message: "",
    },
  };
}

const FullWidthTextField = styled(TextField)(() => ({
  width: "100%",
}));

export default function CartPage() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [validations, setValidations] = useState(getDefaultValidations());

  const closeOut = () => {
    setAddress("");

    //   onClose();
  };

  const BorderlessTableCell = styled(TableCell)(() => ({
    borderBottom: "none",
  }));

  const handleValidations = (validationResponse) => {
    let validations = getDefaultValidations();
    validationResponse.violations &&
      validationResponse.violations.forEach((violaion) => {
        validations[violaion.fieldName].error = true;
        validations[violaion.fieldName].message = violaion.message;
      });
    setValidations(validations);
  };

  const finishPurchase = () => {
    const productIDs = cart.products.map((product) => {
      return { id: product.id, count: product.selectedCount };
    });
    const payload = {
      boughtProducts: productIDs,
      userId: user.id,
      address: address,
    };
    makePurchase(payload, user.accessToken)
      .then((response) => {
        // setSnackBarOpen(true);
        dispatch(clearCart());
        enqueueSnackbar("Purchase Successful", { variant: "success" });
        closeOut();
        navigate("/");
      })
      .catch((error) => {
        handleValidations(error.response.data);
      });
  };

  const setProductCount = (id, count) => {
    dispatch(changeProductCount({ id: id, newCount: count }));
    enqueueSnackbar("Product quantity changed", { variant: "success" });
  };

  const countToArray = (count) => {
    let array = [];
    if (count >= 30) {
      count = 30;
    }
    for (let i = 1; i <= count; i++) {
      array.push(i);
    }
    return array;
  };

  const removeFromCart = (id) => {
    dispatch(removeProduct({ id }));
    enqueueSnackbar("Product removed from cart", { variant: "success" });
  };

  const lightBlue = theme.palette.mode === "light" ? blue[100] : blueGrey[900];

  return (
    <Container>
      <Typography variant="h3" sx={{ m: 2 }}>
        Shopping Cart
      </Typography>
      <Stack
        spacing={2}
        style={{ padding: "1rem", marginBottom: "2.5rem", borderRadius: "4px" }}
      >
        {cart.products.length > 0 ? (
          <FullWidthTextField
            id="address"
            error={address === "" ? true : undefined}
            value={address}
            label="Dellivery Address"
            onChange={(event) => setAddress(event.target.value)}
            required
            helperText={validations.address.message}
          />
        ) : (
          <Alert severity="info">Cart is currently empty</Alert>
        )}

        {/* </Paper> */}
        {cart.products.map((product) => {
          return (
            <Paper elevation={3}>
              <Grid container sx={{ padding: "20px" }} spacing={2}>
                <Grid item xs={2.5}>
                  <Card sx={{ maxWidth: 200 }}>
                    {/* <CardActionArea> */}
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.imageUrls && product.imageUrls[0]}
                      alt={product.name}
                    />
                    {/* </ CardActionArea> */}
                  </Card>
                </Grid>
                <Grid item xs={5.5} textAlign="left">
                  <Stack spacing={2}>
                    <Typography variant="h5" component="span">
                      {product.type}: {product.name} {product.brand}{" "}
                      {product.model}
                    </Typography>
                    <Typography variant="h7">{product.description}</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <InputLabel>Count</InputLabel>
                  <Select
                    id="count"
                    name="count"
                    value={product.selectedCount}
                    label="count"
                    onChange={(event) =>
                      setProductCount(product.id, event.target.value)
                    }
                  >
                    {countToArray(product.count).map((count, index) => {
                      return (
                        <MenuItem key={index} value={count}>
                          {count}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <Stack spacing={2} alignItems="flex-end">
                    <Typography variant="h3">
                      {product.combinedPrice.toFixed(2)} lv
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeFromCart(product.id)}
                      startIcon={<DeleteIcon />}
                      sx={{ width: "8rem" }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
        <Box sx={{ display: "flex", flexFlow: "row-reverse" }}>
          <div>
            <Typography variant="h4">Total Price: </Typography>
            <Typography variant="h2">
              {cart.totalPrice.toFixed(2)} lv
            </Typography>
          </div>
        </Box>
      </Stack>
      <div
        style={{
          float: "center",
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 50,
          placeItems: "center",
        }}
      >
        {cart.products.length > 0 ? (
          <Button
            variant="contained"
            onClick={finishPurchase}
            sx={{ height: "3rem" }}
          >
            Finish Order
          </Button>
        ) : (
          <Button component={Link} to="/" variant="contained">
            Back to browse
          </Button>
        )}
      </div>
    </Container>
  );
}
