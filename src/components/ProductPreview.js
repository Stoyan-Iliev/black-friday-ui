import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../redux/features/CartSlice';
import CustomSnackBar from "./CustomSnackBar";
import { useSnackbar } from 'notistack';


export default function ProductPreview({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [openSnackBar, setSnackBarOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar(); 

  const addProductToCart = (e) => {
    enqueueSnackbar('Product added to cart', { variant: "success" });
    dispatch(addProduct(product));
  }

  return (
    <Card sx={{ height: "342.75px", marginRight: "1px" }}>
      <CardActionArea onClick={() => navigate("/products/" + product.id)}>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrls && product.imageUrls[0]}
          alt={product.name}
        />
        <CardContent sx={{height: 96, display: "flex",
            alignItems: "center",
            justifyContent: "center" }}>
          <Typography variant="h6" component="div" sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
          }}>
            {product.name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Grid container spacing={2}>
        <Grid
          item
          xs={8}
          sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
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
        <Grid item xs={4}>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button size="small" color="primary" onClick={addProductToCart}>
              Buy
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
