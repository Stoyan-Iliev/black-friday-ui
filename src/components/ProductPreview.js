import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductPreview({ product }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 200, margin: "5px" }}>
      <CardActionArea onClick={() => navigate("/products/" + product.id)}>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrls && product.imageUrls[0]}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Grid container spacing={2}>
        <Grid
          item
          xs={8}
          sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          <Typography
            component="h6"
            sx={{
              textAlign: "left",
              verticalAlign: "center",
              paddingLeft: "10px",
              color: "red",
            }}
          >
            {(Math.round(product.price * 100) / 100).toFixed(2)} лв.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button size="small" color="primary">
              Buy
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
