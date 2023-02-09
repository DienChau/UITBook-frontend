import { createSlice } from "@reduxjs/toolkit";

const watchedProduct = createSlice({
  name: "watchProduct",
  initialState: {
    listProduct: [],
  },
  reducers: {
    addWatchedProduct: (state, action) => {
      const item = action.payload;
      const isItemExist = state.listProduct.find((i) => i._id === item._id);
      if (!isItemExist) {
        state.listProduct.push(action.payload);
      }
    },
    clearWatchedProduct: (stare, action) => {
      stare.listProduct = [];
    },
  },
});

export const { addWatchedProduct, clearWatchedProduct } =
  watchedProduct.actions;

export default watchedProduct.reducer;
