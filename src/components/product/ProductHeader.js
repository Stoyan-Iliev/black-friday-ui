import "../../css/products/ProductHeader.css";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/features/CartSlice";
import ProductImagePicker from "./ProductImagePicker";
import { useSnackbar } from 'notistack';


export default function ProductHeader({ product }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar(); 

  const { name, price, count, imageUrls } = product;
  const BorderlessTableCell = styled(TableCell)(() => ({
    borderBottom: "none",
  }));

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
    enqueueSnackbar('Product added to cart', { variant: "success" });
  };

  return (
    <div className="product-header-section">
      {/* <img
        className="main-image"
        src={imageUrls && imageUrls[0]}
        alt="product"
      /> */}
      <ProductImagePicker images={product.imageUrls} />
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
              <BorderlessTableCell>
                <Typography variant="h6">
                  Price: <b style={{ color: "green" }}>{price} lv</b>
                </Typography>
              </BorderlessTableCell>
              <BorderlessTableCell>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={addToCart}
                >
                  Buy
                </Button>
              </BorderlessTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
