import "./App.css";
import MainNavBar from "./components/MainNavBar";
import ProductPreview from "./components/ProductPreview";
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

function App() {
  return (
    <div className="App">
      <MainNavBar />
      {
        // isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
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
  );
}

export default App;
