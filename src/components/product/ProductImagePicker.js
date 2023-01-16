import "../../css/products/ProductImagePicker.css";

import IconButton from "@mui/material/IconButton";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ListItem, Stack } from "@mui/material";
import * as React from "react";

export default function ProductImagePicker({ images }) {
  console.log(images);
  return (
    <div className="image-picker">
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <IconButton>
          <KeyboardArrowLeftIcon />
        </IconButton>

        {images?.map((src) => {
          return (
            <ListItem>
              <a href={src}>
                <img className="image" src={src} alt={"Missing"} />
              </a>
            </ListItem>
          );
        })}

        <IconButton>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Stack>
    </div>
  );
}
