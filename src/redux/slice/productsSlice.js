import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productsSlice = createSlice({
  name: "Filter",
  initialState: {
    products: [],
  },
  reducers: {
    clearErrors: (state, actions) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loading = false;
        state.products = action.payload.books;
        state.productsCount = action.payload.booksCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredBooksCount;
        state.error = action.payload.message;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        console.log("action", action.payload);
        console.log("rejected");
      });
  },
});

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (infoData) => {
    const {
      keyword,
      currentPage,
      price,
      category,
      ratings,
      author,
      publisher,
    } = infoData;
    const data = await getAllBook(
      keyword,
      currentPage,
      price,
      category,
      ratings,
      author,
      publisher
    )
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
    console.log("products/getProduct", data);
    return data;
  }
);

const getAllBook = function (
  keyword,
  currentPage,
  price,
  category,
  ratings,
  author,
  publisher
) {
  console.log("getAllBook", category);
  if (category && author && publisher) {
    console.log(1);
    return axios.get(
      `/api/v2/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&author=${author}&publisher=${publisher}`
    );
  } else if (category && publisher && !author) {
    console.log(2);
    return axios.get(
      `/api/v2/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&publisher=${publisher}`
    );
  } else if (category && author && !publisher) {
    console.log(3);
    return axios.get(
      `/api/v2/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&author=${author}`
    );
  } else if (category && !author && !publisher) {
    console.log(4);
    return axios.get(
      `/api/v2/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    );
  } else if (author && publisher) {
    console.log(5);
    return axios.get(
      `/api/v2/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&author=${author}&publisher=${publisher}`
    );
  } else if (author && !publisher) {
    console.log(6);
    return axios.get(
      `/api/v2/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&author=${author}`
    );
  } else if (publisher) {
    console.log(7);
    return axios.get(
      `/api/v2/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&publisher=${publisher}`
    );
  } else {
    console.log(8);
    console.log(
      `/api/v2/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    );
    return axios.get(
      `/api/v2/books?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    );
  }
};

export const { clearErrors } = productsSlice.actions;

export default productsSlice.reducer;
