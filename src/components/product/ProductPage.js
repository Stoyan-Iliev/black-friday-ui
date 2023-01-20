import MainNavBar from "../MainNavBar";
import ProductHeader from "./ProductHeader";
import ProductImagePicker from "./ProductImagePicker";
import { getProductById } from "../../api/backendRequests";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/system";
import { Button, Grid, Menu, MenuItem, Typography } from "@mui/material";
import AddProduct from "../AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { addProduct } from "../../redux/features/CartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductPage() {
  let { id } = useParams();
  const [product, setProduct] = useState({ imageUrls: [] });
  const getProduct = () => {
    getProductById(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, []);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const roles = useSelector((state) => state.user.roles);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isEmployee =
    roles && (roles.includes("ROLE_EMPLOYEE") || roles.includes("ROLE_ADMIN"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    handleMenuClose();
    getProduct();
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleModalOpen}>Edit</MenuItem>
      <MenuItem onClick={handleMenuClose}>Add To Campaign</MenuItem>
    </Menu>
  );

  const addToCart = () => {
    if (isLoggedIn) {
      dispatch(addProduct(product));
      enqueueSnackbar("Product added to cart", { variant: "success" });
    } else {
      enqueueSnackbar("You need to be logged in to add to the cart", { variant: "info" });
    }
  };

  const renderStocksLabel = () => {
    return product.count > 0 ? (
      <Typography variant="h6" color="success.main">
        In stock
      </Typography>
    ) : (
      <Typography variant="h6" color="warning.main">
        Out of stock
      </Typography>
    );
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <ProductImagePicker images={product.imageUrls} />
        </Grid>
        <Grid item xs={12} sm={6} >
          <Stack spacing={2} sx={{ alignItems: "flex-start", mt: 10, ml: 3 }}>
            <Typography gutterBottom variant="h4">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h5">
              Brand: {product.brand}
            </Typography>
            <Typography gutterBottom variant="h5">
              Model: {product.model}
            </Typography>
            {renderStocksLabel()}
            <Box display={"flex"} alignSelf="stretch" justifyContent={"space-between"}>
              <Typography variant="h6">
                Price: <b style={{ color: "green" }}>{product.price} lv</b>
              </Typography>
              {isEmployee ? (
                <>
                  <Button
                    color="primary"
                    onClick={handleProfileMenuOpen}
                    variant="contained"
                  >
                    Edit
                  </Button>
                  {renderMenu}
                  <AddProduct
                    product={product}
                    open={isModalOpen}
                    onClose={handleModalClose}
                  />
                </>
              ) : (
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={addToCart}
                >
                  Buy
                </Button>
              )}
            </Box>
            <Typography gutterBottom variant="h6" textAlign={"left"}>
              {product.description}
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      {/* <ProductHeader product={product} /> */}
      {/* <ProductImagePicker images={product.imageUrls} /> */}
    </Container>
  );
}
