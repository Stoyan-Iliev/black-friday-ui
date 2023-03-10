import { useEffect, useState } from "react";
import * as React from "react";
import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box,
  Button,
  Modal,
} from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { createProduct, updateProduct } from "../api/backendRequests";
import { productTypes } from "../utils/constants";
import { useSnackbar } from "notistack";

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

function getDefaultValidations() {
  return {
    name: {
      error: false,
      message: "",
    },
    type: {
      error: false,
      message: "",
    },
    price: {
      error: false,
      message: "",
    },
    minPrice: {
      error: false,
      message: "",
    },
    Model: {
      error: false,
      message: "",
    },
    Brand: {
      error: false,
      message: "",
    },
  };
}

const BorderlessTableCell = styled(TableCell)(() => ({
  borderBottom: "none",
}));

const FullWidthTextField = styled(TextField)(() => ({
  width: "100%",
}));

export default function AddProduct({ open, onClose, product }) {
  const token = useSelector((state) => state.user.accessToken);
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [minAllowedPrice, setMinAllowedPrice] = useState("");
  const [description, setDescription] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState("");
  const [imagesNames, setImagesNames] = useState([]);
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [validations, setValidations] = useState(getDefaultValidations());

  const roles = useSelector((state) => state.user.roles);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setType(product.type);
      setPrice(product.price);
      setMinAllowedPrice(product.minPrice);
      setDescription(product.description);
      setAvailableStock(product.count);
      setDiscountPercent(product.discountPercent);
      setChecked(product.onSale);
      setImages(product.images);
      setModel(product.model);
      setBrand(product.brand);
    }
  }, [product]);

  const closeOut = () => {
    if (!product) {
      setName("");
      setType("");
      setModel("");
      setBrand("");
      setPrice("");
      setMinAllowedPrice("");
      setDescription("");
      setAvailableStock("");
      setDiscountPercent("");
      setChecked(false);
      setImages("");
      setImagesNames([]);
    }
    onClose();
  };

  const handleUploadClick = (e) => {
    setImages(e.target.files);
    let names = [];
    for (let i = 0; i < e.target.files.length; i++) {
      names.push(e.target.files[i].name);
    }
    setImagesNames(names);
  };

  const handleValidations = (validationResponse) => {
    let validations = getDefaultValidations();
    validationResponse.violations &&
      validationResponse.violations.forEach((violaion) => {
        validations[violaion.fieldName].error = true;
        validations[violaion.fieldName].message = violaion.message;
      });
    setValidations(validations);
  };

  const addProduct = () => {
    createProduct(
      {
        name: name,
        type: type,
        model: model,
        brand: brand,
        price: price,
        minPrice: minAllowedPrice,
        description: description,
        count: availableStock,
        discountPercent: discountPercent,
        isOnSale: checked,
      },
      images,
      token
    )
      .then((response) => {
        enqueueSnackbar("Product Added Successfully", { variant: "success" });
        closeOut();
      })
      .catch((error) => {
        console.log(error.response.data);
        handleValidations(error.response.data);
      });
  };

  const editProduct = () => {
    const newProduct = {
      id: product.id,
      name: name,
      type: type,
      model: model,
      brand: brand,
      price: price,
      minPrice: minAllowedPrice,
      description: description,
      count: availableStock,
      discountPercent: discountPercent,
      isOnSale: checked,
      imageUrls: product.imageUrls,
    };
    updateProduct(newProduct, token)
      .then((response) => {
        enqueueSnackbar("Product Updated Successfully", { variant: "success" });
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
          <h3 style={{ textAlign: "center" }}>Add New Product</h3>
          <Table>
            <TableBody>
              <TableRow>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="name"
                    label="Name"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    error={validations.name.error}
                    helperText={validations.name.message}
                  />
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <FormControl fullWidth error={validations.type.error}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      id="type"
                      name="type"
                      value={type}
                      label="Type"
                      onChange={(event) => setType(event.target.value)}
                      helperText={validations.type.message}
                    >
                      {productTypes.map((type, index) => {
                        return (
                          <MenuItem key={index} value={type}>
                            {type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>{validations.type.message}</FormHelperText>
                  </FormControl>
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="model"
                    label="Model"
                    onChange={(event) => setModel(event.target.value)}
                    value={model}
                    error={validations.Model.error}
                    helperText={validations.Model.message}
                  />
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="brand"
                    label="Brand"
                    onChange={(event) => setBrand(event.target.value)}
                    value={brand}
                    error={validations.Brand.error}
                    helperText={validations.Brand.message}
                  />
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="price"
                    label="Price"
                    onChange={(event) => setPrice(event.target.value)}
                    value={price}
                    error={validations.price.error}
                    helperText={validations.price.message}
                  />
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="min-allowed-price"
                    label="Minimal Allowed Price"
                    onChange={(event) => setMinAllowedPrice(event.target.value)}
                    value={minAllowedPrice}
                    error={validations.minPrice.error}
                    helperText={validations.minPrice.message}
                  />
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="discount-percent"
                    label="Discount Precent"
                    onChange={(event) => setDiscountPercent(event.target.value)}
                    value={discountPercent}
                  />
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="available-stock"
                    label="Available Stock"
                    onChange={(event) => setAvailableStock(event.target.value)}
                    value={availableStock}
                  />
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell sx={{ spacing: "2" }}>
                  <FullWidthTextField
                    id="description"
                    label="Description"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                  />
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label="On Sale"
                    value={checked}
                  />
                </BorderlessTableCell>
                {!product && (
                  <BorderlessTableCell>
                    <Button variant="contained" component="label">
                      Upload File
                      <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleUploadClick}
                      />
                    </Button>
                    {imagesNames.map((name) => (
                      <div>{name}</div>
                    ))}
                  </BorderlessTableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ display: "grid", placeItems: "center" }}>
            <Button
              variant="contained"
              onClick={product ? editProduct : addProduct}
            >
              {product ? "Edit Product" : "Add Product"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
