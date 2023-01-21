import MainNavBar from "./MainNavBar";

import { getProductsByCategory } from "../api/backendRequests";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Checkbox,
  Switch,
} from "@mui/material";
import { useParams } from "react-router-dom";
import ProductPreview from "./ProductPreview";

export default function CategoryBrowse() {
  let { category } = useParams();
  const [products, setProducts] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [searchMinPrice, setSearchMinPrice] = useState(0);
  const [searchMaxPrice, setSearchMaxPrice] = useState(0);
  const [isSearchByMaxPrice, setIsSearchByMaxPrice] = useState(false);
  const [searchOnlyOnSale, setSearchOnlyOnSale] = useState(false);

  const handleMinPriceFilterChange = (event) => {
    if (event.target.value >= 0) {
      setSearchMinPrice(event.target.value);
    } else {
      setSearchMinPrice(0);
    }
  };

  const handleMaxPriceFilterChange = (event) => {
    if (event.target.value >= 0) {
      setSearchMaxPrice(event.target.value);
    } else {
      setSearchMaxPrice(0);
    }
  };

  const clearFilters = () => {
    setSearchName("");
    setSearchBrand("");
    setSearchModel("");
    setSearchMinPrice(0);
    setSearchMaxPrice(0);
    setIsSearchByMaxPrice(false);
    setSearchOnlyOnSale(false);
  };

  function filterProducts(list) {
    let searchNameToLower = searchName.toLowerCase();
    let searchBrandToLower = searchBrand.toLowerCase();
    let searchModelToLower = searchModel.toLowerCase();
    let answer = list.filter((product) => {
      const productName = product.name.toLowerCase();
      const productBrand = product.brand.toLowerCase();
      const productModel = product.model.toLowerCase();
      return (
        productName.includes(searchNameToLower) &&
        productBrand.includes(searchBrandToLower) &&
        productModel.includes(searchModelToLower) &&
        product.price >= searchMinPrice &&
        checkMaxPrice(product.price, searchMaxPrice, isSearchByMaxPrice) &&
        checkIsOnSale(product.onSale, searchOnlyOnSale)
      );
    });
    return answer;
  }

  const checkMaxPrice = (productPrice, maxPrice, maxPriceActive) => {
    if (!maxPriceActive || maxPrice === 0) {
      return true;
    }
    if (productPrice <= maxPrice) {
      return true;
    }
    return false;
  };

  const checkIsOnSale = (productOnSale, onSaleActive) => {
    if (!onSaleActive) {
      return true;
    }
    if (onSaleActive && productOnSale) {
      return true;
    }
    return false;
  };

  const fillCategoryProductsList = () => {
    getProductsByCategory(category)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fillCategoryProductsList();
  }, [category]);

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={4} sx={{ mt: 0, mb: 4 }}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Typography
            variant="h5"
            style={{ textAlign: "left", padding: "5px" }}
          >
            Filters
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Typography component="label">Show only On Sale</Typography>
            <Switch
              checked={searchOnlyOnSale}
              onChange={(e) => setSearchOnlyOnSale(e.target.checked)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            id="searchName"
            name="searchName"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            label="Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            id="searchBrand"
            name="searchBrand"
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
            label="Brand"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            fullWidth
            id="searchModel"
            name="searchModel"
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
            label="Model"
          />
        </Grid>
        <Grid item xs={5} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
          <TextField
            fullWidth
            id="searchMinPrice"
            name="searchMinPrice"
            type="number"
            value={searchMinPrice}
            onChange={handleMinPriceFilterChange}
            label="Min Price"
          />
        </Grid>
        <Grid item xs={5} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
          <TextField
            fullWidth
            id="searchMaxPrice"
            name="searchMaxPrice"
            type="number"
            value={searchMaxPrice}
            disabled={!isSearchByMaxPrice}
            onChange={handleMaxPriceFilterChange}
            label="Max Price"
          />
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          <Typography component="label">max</Typography>
          <Checkbox
            checked={isSearchByMaxPrice}
            onChange={(e) => setIsSearchByMaxPrice(e.target.checked)}
          ></Checkbox>
        </Grid>
      </Grid>
      <Typography variant="h5" style={{ textAlign: "left", padding: "5px" }}>
        {category}
      </Typography>
      <Grid container direction="row" spacing={1} sx={{ mb: 3 }}>
        {filterProducts(products).map((p, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} xl={2.4}>
            <ProductPreview
              product={p}
              key={index}
              handleUpdateClose={fillCategoryProductsList}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
