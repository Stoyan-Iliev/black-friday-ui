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
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { changeProductCount, removeProduct, clearCart } from '../redux/features/CartSlice';


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
  
  const FullWidthTextField = styled(TextField)(() => ({
    width: "100%",
  }));

export default function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
  
    const [address, setAddress] = useState("");
  
    const closeOut = () => {
      setAddress("");
      
    //   onClose();
    };
  
    const BorderlessTableCell = styled(TableCell)(() => ({
      borderBottom: "none",
    }));
  
    const finishPurchase = () => {
      const productIDs = cart.products.map((product) => {
        return { id: product.id, count: product.selectedCount };
      });
      const payload = {
        boughtProducts: productIDs,
        userId: user.id,
        address: address,
      }
        makePurchase(payload, user.accessToken).then((response) => {
            dispatch(clearCart());
            navigate("/")
            console.log(response.data);
        }).catch((error) => {
            console.log(error)
        });
  
      closeOut();
    };

    const setProductCount = (id, count) => {
        console.log("Set Count: ", id, ", count: ", count)
        dispatch(changeProductCount({id: id, newCount: count}));
    }

    const countToArray = (count) => {
        let array = [];
        for (let i = 1; i <= count; i++) {
            array.push(i);
        }
        return array;
    }
  
    return (
        <Container>
            <Typography variant="h3" sx={{m:2}}>Shopping Cart</Typography>
            <Stack spacing={2} style={{backgroundColor:"#e4f1f9", padding:"1rem", borderRadius:"4px"}}>
                <FullWidthTextField
                    id="address"
                    error={address === "" ? true : undefined}
                    value={address}
                    label="Dellivery Address"
                    onChange={(event) => setAddress(event.target.value)}
                    required
                />
                {cart.products.map((product) => {
                    console.log(product);
                    return (
                    <Paper elevation={3}>
                        <Grid container sx={{padding: "20px"}} spacing={2}>
                            <Grid item xs={2.5}>
                            <Card sx={{ maxWidth: 200}}>
                                <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.imageUrls && product.imageUrls[0]}
                                    alt={product.name}
                                />
                                </ CardActionArea>
                            </Card>
                            </Grid>
                            <Grid item xs={5.5} textAlign="left"  >
                                <Stack spacing={2}>
                                    <Typography variant="h5" component="span">{product.type}: {product.name} {product.brand} {product.model}</Typography>
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
                                    onChange={(event) => setProductCount( product.id, event.target.value)}
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
                                    <Stack spacing={2} alignItems="flex-end" >
                                        <Typography variant="h3">{product.combinedPrice} lv</Typography> 
                                        <Button variant="outlined" color="error" onClick={() => dispatch(removeProduct({id: product.id}))} startIcon={<DeleteIcon />} sx={{width:"8rem"}}>
                                            Delete
                                        </Button>
                                    </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                );
            })}
            <Typography>{cart.totalPrice}</Typography>
          </Stack>
          <div style={{ display: "grid", placeItems: "center" }}>
            <Button variant="contained" onClick={finishPurchase}>
              Finish Order
            </Button>
          </div>
        </Container>
    );
}