import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllProducts, getAllCampaigns } from "../api/backendRequests";
import MainNavBar from "./MainNavBar";
import DynamicProductList from "./product/DynamicProductList";
import ProductList from "./ProductList";

export default function CampaignChoice() {
  const [products, setProducts] = useState([]);
  const allProducts = () => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  const [campaign, setCampaign] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const allCampaigns = () => {
    getAllCampaigns()
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    allProducts();
    allCampaigns();
  }, []);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Cmpaigns</InputLabel>
        <Select
          id="campaign"
          name="campaign"
          value={campaign}
          label="campaign"
          onChange={(event) => setCampaign(event.target.value)}
        >
          {campaigns.map((name, index) => {
            return (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <ProductList products={products} type="Laptops" />
      {/* <DynamicProductList products={products} type="Lapto" /> */}
      {/* <AppFooter /> */}
    </>
  );
}
