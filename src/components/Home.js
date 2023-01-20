import MainNavBar from "./MainNavBar";

import { getAllProducts } from "../api/backendRequests";
import { useEffect, useState } from "react";
import { filter } from "../utils/constants";
import ProductList from "./ProductList";
import Container from "@mui/material/Container";
import { productTypes } from "../utils/constants";

export default function Home() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(new Map());
  const allProducts = () => {
    getAllProducts()
      .then((response) => {
        console.log("U HOME: ", response.data);
        // for(let i = 0; i < 3; i++) {
        //   console.log("U loop: ", i)
        //   response.data["Computers"] = response.data["Computers"].concat(response.data["Computers"])
        //   console.log(response.data)
        // }
        // setProducts(response.data);
        setProducts(response.data);
        // setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  };

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <div>
      <Container sx={{ mt: 3 }}>
        {productTypes.map((productType) => (
          <ProductList
            products={products[productType]}
            type={productType}
            handleUpdateClose={() => allProducts()}
          />
        ))}
      </Container>
    </div>
  );
}
