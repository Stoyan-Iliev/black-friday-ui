import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    price: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      console.log(state.products);
      console.log(action.payload);
      state.products.push(action.payload);
      // state.products = [];
      state.price += action.payload.price;
      console.log(state);
    },
    // removeProduct: (state) => {
    //   state.id = null;
    //   state.username = null;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct } = CartSlice.actions;

export default CartSlice.reducer;
