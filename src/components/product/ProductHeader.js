import "../../css/products/ProductHeader.css";

import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/features/CartSlice";
import ProductImagePicker from "./ProductImagePicker";
import { useSnackbar } from "notistack";
import AddProduct from "../AddProduct";
import { Menu, MenuItem } from "@mui/material";

export default function ProductHeader({ product, handleUpdateClose }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { name, price, count, imageUrls } = product;
  const BorderlessTableCell = styled(TableCell)(() => ({
    borderBottom: "none",
  }));
  const roles = useSelector((state) => state.user.roles);
  const isEmployee =
    roles && (roles.includes("ROLE_EMPLOYEE") || roles.includes("ROLE_ADMIN"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    handleMenuClose();
    handleUpdateClose();
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

  const renderStocksLabel = () => {
    return count > 0 ? (
      <Typography variant="h6" color="success.main">
        In stock
      </Typography>
    ) : (
      <Typography variant="h6" color="warning.main">
        Out of stock
      </Typography>
    );
  };

  const addToCart = () => {
    dispatch(addProduct(product));
    enqueueSnackbar("Product added to cart", { variant: "success" });
  };

  return (
    <div>
      {/* <ProductImagePicker images={product.imageUrls} /> */}
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <BorderlessTableCell>
                <Typography gutterBottom variant="h4" component="div">
                  {name}
                </Typography>
              </BorderlessTableCell>
            </TableRow>
            <TableRow>
              <BorderlessTableCell>{renderStocksLabel()}</BorderlessTableCell>
            </TableRow>
            <TableRow>
              {/* <BorderlessTableCell> */}
              <Typography variant="h6">
                Price: <b style={{ color: "green" }}>{price} lv</b>
              </Typography>
              {/* </BorderlessTableCell> */}
              {/* <BorderlessTableCell> */}
              {isEmployee ? (
                <>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleProfileMenuOpen}
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
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={addToCart}
                >
                  Buy
                </Button>
              )}
              {/* </BorderlessTableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
