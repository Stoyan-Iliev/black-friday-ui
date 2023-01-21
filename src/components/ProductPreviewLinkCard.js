import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

export default function ProductPreviewLinkCard({ category }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: "342.75px" }}>
      <CardActionArea
        onClick={() => navigate(`/category/${category}`)}
        sx={{ height: "100%" }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <div>
              <ZoomInIcon color="primary" sx={{ fontSize: 150 }} />
              <Typography color="primary">Discover more in category</Typography>
            </div>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
