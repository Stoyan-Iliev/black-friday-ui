import { filter } from "../../utils/constants";
import ProductList from "../ProductList";

export default function DynamicProductList({ products }) {
  console.log(products);
  let filteredProducts = filter(products);
  console.log(filteredProducts);
  return (
    <>
      {filteredProducts &&
        filteredProducts.entries.map((key, value) => {
          return <ProductList products={value} type={key} />;
        })}
    </>
  );
}
