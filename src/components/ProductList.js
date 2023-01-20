import { Grid, IconButton, Typography } from "@mui/material";
import ProductPreview from "./ProductPreview";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SwipeableViews from 'react-swipeable-views';
import React, { useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function ProductList({ products, type }) {
  

  const sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
  }

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
  const maxSteps = products && products.length / productLength;

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
        setProductLength(newLength)
      }
  }

    window.addEventListener('resize', handleResize)
  })

  const responsive = {
    0: { items: 2 },
    100: { items: 2 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  // const carousel = useRef<AliceCarousel>(null);

  return (
    <div>
      {!isEmpty ? <><Typography variant="h5" style={{ textAlign: "left", padding: "5px" }}>{type}</Typography>
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
            axis={'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {sliceIntoChunks(products, productLength).map((slicedProducts, index) => (
            <div>
              <Grid container direction="row" sx={{mb: 3}}>
                {slicedProducts.map((p, index) => {
                  return <Grid item xs={12} sm={6} md={3} lg={2.4} xl={2.4}>
                      <ProductPreview product={p} key={index} />
                    </Grid>
                })}
              </Grid>
            </div>
            ))}
          </SwipeableViews>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleNext} disabled={activeStep >= maxSteps - 1}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      </> : null}
    </div>
  );
}
