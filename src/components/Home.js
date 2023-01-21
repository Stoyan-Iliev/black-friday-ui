import { getAllProducts } from "../api/backendRequests";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Container from "@mui/material/Container";
import { productTypes } from "../utils/constants";

export default function Home() {
  const [products, setProducts] = useState(new Map());
  const allProducts = () => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <div>
      <Container sx={{ mt: 3 }}>
        {productTypes.map((productType, index) => (
          <ProductList
            products={products[productType]}
            type={productType}
            key={index}
            handleUpdateClose={() => allProducts()}
          />
        ))}
      </Container>
    </div>
  );
}
