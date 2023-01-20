import { Grid, IconButton, Typography } from "@mui/material";
import ProductPreview from "./ProductPreview";
import ProductPreviewLinkCard from "./ProductPreviewLinkCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SwipeableViews from "react-swipeable-views";
import { Link } from "react-router-dom";

import React, { useState } from "react";

export default function ProductList({ products, type, handleUpdateClose }) {
  const sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    if (arr.length >= 30) {
      arr = arr.slice(0, 29); //TESTVAI TVA S POVECHE !!REMINDER
    }
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      if (i + chunkSize >= arr.length) {
        // i++;
        if (chunk.length < chunkSize) {
          chunk.push("LINK");
          res.push(chunk);
        } else {
          res.push(chunk);
          res.push(["LINK"]);
        }
      } else {
        res.push(chunk);
      }
    }
    return res;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // const maxSteps = images.length;
  const [productLength, setProductLength] = useState(5);
  const isEmpty = !products || products.length === 0;
  const [activeStep, setActiveStep] = useState(0);
  const productsListLength =
    products && products.length <= 29 ? products.length + 1 : 30;
  const maxSteps = productsListLength && productsListLength / productLength;

  React.useEffect(() => {
    function handleResize() {
      let newLength = 5;
      if (window.innerWidth < 1200) {
        newLength = 4;
      }
      if (window.innerWidth < 900) {
        newLength = 2;
      }
      if (window.innerWidth < 600) {
        newLength = 1;
      }
      if (newLength !== productLength) {
        if (newLength > productLength) {
          setActiveStep(0);
        }
        setProductLength(newLength);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
  });

  const responsive = {
    0: { items: 2 },
    100: { items: 2 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  // const carousel = useRef<AliceCarousel>(null);

  return (
    <div>
      {!isEmpty ? (
        <>
          <Typography
            component={Link}
            to={"/category/" + type}
            variant="h5"
            sx={{
              display: {
                sm: "block",
                textDecoration: "none",
                color: "inherit",
                textAlign: "left",
                padding: "5px",
                width: "fit-content",
              },
            }}
          >
            {type}
          </Typography>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={1}>
              <IconButton onClick={handleBack} disabled={activeStep === 0}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              {/* <AliceCarousel 
            items={getItems()}
            responsive={responsive}
          /> */}

              <SwipeableViews
                axis={"x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {sliceIntoChunks(products, productLength).map(
                  (slicedProducts, upperIndex) => (
                    // <div>
                    <>
                      <Grid
                        container
                        direction="row"
                        spacing={1}
                        sx={{ mb: 3 }}
                      >
                        {slicedProducts.map((p, index) => {
                          return (
                            <Grid item xs={12} sm={6} md={3} lg={2.4} xl={2.4}>
                              {p === "LINK" ? (
                                <ProductPreviewLinkCard category={type} />
                              ) : (
                                <ProductPreview
                                  product={p}
                                  key={index}
                                  handleUpdateClose={() => handleUpdateClose()}
                                />
                              )}
                            </Grid>
                          );
                        })}
                      </Grid>
                    </>
                    // </div>
                  )
                )}
                {/* <Grid item xs={12} sm={6} md={3} lg={2.4} xl={2.4}> */}
                {/* </Grid> */}
              </SwipeableViews>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={handleNext}
                disabled={activeStep >= maxSteps - 1}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>
      ) : null}
    </div>
  );
}
