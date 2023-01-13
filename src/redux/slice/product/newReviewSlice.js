import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import ProductDataService from "../../../services/product";
import ProductDataService from "../../services/product";

const namespace = "newReview";

const initialState = {};
// fix object
export const newReview = createAsyncThunk(
  `${namespace}/newReview`,
  async (reviewData) => {
    // const config = {
    //   headers: { "Content-Type": "application/json" },
    // };

    // const { data } = await axios.post(
    //   `https://peaceful-brushlands-80713.herokuapp.com/api/v2/book/review`,
    //   reviewData,
    //   config
    // );
    // console.log(data);
    // return data.success;
    const data = await ProductDataService.createNewReview(reviewData)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data;
      });
    console.log("new review:", data);
    return data;
  }
);
export const newReviewSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    clearErrorsReview: (state, action) => {
      state.error = null;
    },
    resetStateReview: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: {
    [newReview.pending]: (state, action) => {
      console.log("pending");
      state.loading = true;
    },
    [newReview.fulfilled]: (state, action) => {
      console.log("fullfill");
      state.loading = false;
      state.success = action.payload.success;
      state.error = action.payload.message;
    },
    [newReview.rejected]: (state, action) => {
      console.log("rejected");
      state.loading = false;
    },
  },
});
export const { clearErrorsReview, resetStateReview } = newReviewSlice.actions;

export default newReviewSlice.reducer;
