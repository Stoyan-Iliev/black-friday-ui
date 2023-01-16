import MainNavBar from "./MainNavBar";

import { getAllProducts } from "../api/backendRequests";
import { useEffect, useState } from "react";
import { filter } from "../utils/constants";
import ProductList from "./ProductList";

export default function Home() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(new Map());
  const allProducts = () => {
    getAllProducts()
      .then((response) => {
        console.log(response.data);
        // setProducts(response.data);
        setFilteredProducts(filter(response.data));
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

  // let filteredProducts = filter(products);

  const renderFilteredProducts = () => {
    let productsResult = [];
    console.log("govna");
    console.log(filteredProducts);
    for (let entry of filteredProducts.entries()) {
      const type = entry[0];
      const products = entry[1];
      const product = <ProductList products={products} type={type} />;
      productsResult.push(product);
    }
    // return loading ? productsResult : null;
    return productsResult;
  };

  return (
    <div>
      <MainNavBar />
      {renderFilteredProducts()}
    </div>
  );
}
