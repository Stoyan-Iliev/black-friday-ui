import { filter } from "../../utils/constants";
import ProductList from "../ProductList";

export default function DynamicProductList({ products }) {
  let filteredProducts = filter(products);
  return (
    <>
      {filteredProducts &&
        filteredProducts.entries.map((key, value) => {
          return <ProductList products={value} type={key} />;
        })}
    </>
  );
}
