import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: null,
  error: null,
  success: null,
  order: {},
};

export const creatOrder = createAsyncThunk(
  "createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v2/order/new", order);
      console.log("data", data);
      return data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

const newOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    clear: () => {
      state.error = null;
      state.message = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(creatOrder.pending, (state, action) => {
        console.log("pedding");
        state.loading = true;
      })
      .addCase(creatOrder.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loading = false;
        state.order = action.payload.order;
        state.success = action.payload.success;
      })
      .addCase(creatOrder.rejected, (state, action) => {
        console.log("reject");
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      });
  },
});

export default newOrderSlice.reducer;
