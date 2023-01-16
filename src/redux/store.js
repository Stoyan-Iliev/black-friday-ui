import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./features/UserSlice";
import cartReducer from "./features/CartSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const cartPersistedReducer = persistReducer(persistConfig, cartReducer);

export default configureStore({
  reducer: {
    user: persistedReducer,
    cart: cartPersistedReducer,
  },
});
