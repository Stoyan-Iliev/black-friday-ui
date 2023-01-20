import "./App.css";
import MainNavBar from "./components/MainNavBar";
import * as React from "react";
import ProductList from "./components/ProductList";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AddProduct from "./components/AddProduct";
import ProductPage from "./components/product/ProductPage";
import Home from "./components/Home";
import CampaignChoice from "./components/CampaingChoice";
import Cart from "./components/Cart";
import CartPage from "./components/CartPage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState, useMemo } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';
import CategoryBrowse from "./components/CategoryBrowse";
import EmailVerifiedPage from "./components/EmailVerifiedPage";


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });


function App() {
  const [mode, setMode] = useState('light');
  useEffect(() => {
    if (typeof window !== 'undefined')
      setMode(window.localStorage.getItem('themePreference') || 'light');
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('themePreference', newMode);
    setMode(newMode);
  }

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
    <div className="App">
      <MainNavBar changeTheme={() => toggleColorMode()}/>
      {
        // isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verified" element={<EmailVerifiedPage />} />
          <Route path="/category/:category" element={<CategoryBrowse />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/signIn/" element={<SignIn />} />
          <Route path="/signUp/" element={<SignUp />} />
          <Route path="/campaignChoice/" element={<CampaignChoice />} />
          <Route path="/cart/" element={<CartPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        // ) : (
        //   <Routes>
        //     <Route path="home" element={<Home />} />
        //     <Route path="signIn" element={<SignIn />} />
        //     <Route path="signUp" element={<SignUp />} />
        //     <Route path="offers" element={<Offers />} />
        //     <Route path="*" element={<SignIn />} />
        //   </Routes>
        // )
      }
    </div>
    </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
