import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      console.log("In add: ", action.payload)
      console.log("state products: ", state.products)
      const existingProduct = state.products.find(product => product.id === action.payload.id);
      if (existingProduct) {
        console.log("Existing: ", existingProduct)
        existingProduct.selectedCount++;
        console.log("Check string: ", action.payload.price)
        existingProduct.combinedPrice += action.payload.price;
      } else {
        const cartProduct = {
          ...action.payload,
          selectedCount: 1,
          combinedPrice: action.payload.price }
        state.products.push(cartProduct);
      }
      state.totalPrice += action.payload.price;
      // state.products = [];
      // state.totalPrice = 0;
    },
    changeProductCount: (state, action) => {
      console.log("CHANGE COUNT: ", action.payload)
      const existingProduct = state.products.find(product => product.id === action.payload.id);
      const removed = existingProduct.selectedCount - action.payload.newCount;
      const priceChange = existingProduct.price * removed;
      existingProduct.selectedCount = action.payload.newCount;
      existingProduct.combinedPrice -= priceChange;
      state.totalPrice -= priceChange;
    },
    removeProduct: (state, action) => {
      const existingProduct = state.products.find(product => product.id === action.payload.id);
      const filteredProducts = state.products.filter(product => product.id !== action.payload.id);
      state.totalPrice -= existingProduct.combinedPrice;
      state.products = filteredProducts;
    },
    clearCart: (state, action) => {
      state.products = [];
      state.totalPrice = 0;
    }
    // removeProduct: (state) => {
    //   state.id = null;
    //   state.username = null;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, clearCart, changeProductCount, removeProduct } = CartSlice.actions;

export default CartSlice.reducer;
