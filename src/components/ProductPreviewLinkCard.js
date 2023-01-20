import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ZoomInIcon from '@mui/icons-material/ZoomIn';


export default function ProductPreviewLinkCard({ category }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: "342.75px" }}>
      <CardActionArea onClick={() => navigate("/products/")} sx={{ height: "100%" }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center"}}>
            <div>
              <ZoomInIcon color="primary" sx={{ fontSize: 150}}/>
              <Typography color="primary">Discover more in category</Typography>
            </div>
          </Box>
        </CardContent>
      </CardActionArea>

      {/* <Grid container spacing={2}>
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
            <Button size="small" color="primary" onClick={addProductToCart}>
              Buy
            </Button>
          </CardActions>
        </Grid> */}
      {/* </Grid> */}
    </Card>
  );
}
