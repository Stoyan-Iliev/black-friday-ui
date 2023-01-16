import { Grid } from "@mui/material";
import ProductPreview from "./ProductPreview";

export default function ProductList({ products, type }) {
  return (
    <div>
      <h2 style={{ textAlign: "left", padding: "5px" }}>{type}</h2>
      <Grid container direction="row">
        {console.log("Vleznaame be")}
        {console.log(products)}
        {products.map((p, index) => {
          return <ProductPreview product={p} key={index} />;
        })}
      </Grid>
    </div>
  );
}
