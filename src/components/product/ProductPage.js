import MainNavBar from "../MainNavBar";
import ProductDetails from "./ProductDetails";
import ProductHeader from "./ProductHeader";
import ProductImagePicker from "./ProductImagePicker";
import { getProductById } from "../../api/backendRequests";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductPage() {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const getProduct = () => {
    getProductById(id)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <MainNavBar />
      <ProductHeader product={product} />
      <ProductImagePicker images={product.imageUrls} />
      <ProductDetails product={product} />
      {/* <AppFooter /> */}
    </>
  );
}
