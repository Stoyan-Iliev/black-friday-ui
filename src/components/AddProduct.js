import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
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
} from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { createProduct } from "../api/backendRequests";
import { productTypes } from "../utils/constants";

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

const BorderlessTableCell = styled(TableCell)(() => ({
  borderBottom: "none",
}));

const FullWidthTextField = styled(TextField)(() => ({
  width: "100%",
}));

export default function AddProduct({ open, onClose }) {
  const token = useSelector((state) => state.user.accessToken);

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

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const closeOut = () => {
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
        console.log(response.data);
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
                  />
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      id="type"
                      name="type"
                      value={type}
                      label="Type"
                      onChange={(event) => setType(event.target.value)}
                    >
                      {productTypes.map((type, index) => {
                        return (
                          <MenuItem key={index} value={type}>
                            {type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="model"
                    label="Model"
                    onChange={(event) => setModel(event.target.value)}
                  />
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="brand"
                    label="Brand"
                    onChange={(event) => setBrand(event.target.value)}
                  />
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="price"
                    label="Price"
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="min-allowed-price"
                    label="Minimal Allowed Price"
                    onChange={(event) => setMinAllowedPrice(event.target.value)}
                  />
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="discount-percent"
                    label="Discount Precent"
                    onChange={(event) => setDiscountPercent(event.target.value)}
                  />
                </BorderlessTableCell>
                <BorderlessTableCell>
                  <FullWidthTextField
                    id="available-stock"
                    label="Available Stock"
                    onChange={(event) => setAvailableStock(event.target.value)}
                  />
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell sx={{ spacing: "2" }}>
                  <FullWidthTextField
                    id="description"
                    label="Description"
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </BorderlessTableCell>
              </TableRow>
              <TableRow>
                <BorderlessTableCell>
                  <FormControlLabel
                    control={<Checkbox onChange={handleChange} />}
                    label="On Sale"
                  />
                </BorderlessTableCell>
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
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ display: "grid", placeItems: "center" }}>
            <Button variant="contained" onClick={addProduct}>
              Add Product
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
