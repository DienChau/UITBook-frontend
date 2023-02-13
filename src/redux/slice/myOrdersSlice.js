import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import OrderDataService from "../services/order";

const namespace = "orders";

const initialState = {
  loading: null,
  err: null,
  success: null,
  orders: [],
};

export const getMyOrders = createAsyncThunk(
  `${namespace}/getMyOrders`,
  async () => {
    const data = await OrderDataService.getAllOrders()
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data;
      });
    return data.orders;
  }
);

export const ordersSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state, action) => {
        console.log("Pending");
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        console.log("fullfill");
        state.loading = false;
        state.success = true;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        console.log("reject");
      });
  },
});

export default ordersSlice.reducer;
