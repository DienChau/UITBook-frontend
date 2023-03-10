import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";
// import { persistStore, persistReducer } from "redux-persist";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import productsSlice from "./slice/productsSlice";

import userSlice from "./slice/userSlice";
import newProductSlice from "./slice/product/newProductSlice";
import newsProductsSlice from "./slice/product/newsProductsSlice";
import newReviewSlice from "./slice/product/newReviewSlice";
import productDetailsSlice from "./slice/product/productDetailsSlice";
import productReviewsSlice from "./slice/product/productReviewsSlice";
import productSlice from "./slice/product/productSlice";
// import productsSlice from "./slice/product/productsSlice";
import reviewSlice from "./slice/product/reviewSlice";
import ratedProductsSlice from "./slice/product/ratedProductsSlice";
import popularProductsSlice from "./slice/product/popularProductsSlice";
import cartSlice from "./slice/cartSlice";
import newOrderSlice from "./slice/newOrderSlice";
import watchedProduct from "./slice/product/watchedProduct";
// import favouriteSlice from "./features/favourite/favouriteSlice";
import favouriteSlice from "./slice/favorites/favouriteSlice";
import myOrdersSlice from "./slice/myOrdersSlice";
import profileUserSlice from "./slice/profileUserSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  user: userSlice,
  userDetail: profileUserSlice,
  // products: productsSlice,
  favourite: favouriteSlice,
  product: productSlice,
  newProduct: newProductSlice,
  newsProducts: newsProductsSlice,
  popularProducts: popularProductsSlice,
  ratedProducts: ratedProductsSlice,
  productDetails: productDetailsSlice,
  newReview: newReviewSlice,
  productReviews: productReviewsSlice,
  review: reviewSlice,
  products: productsSlice,
  cart: cartSlice,
  order: newOrderSlice,
  productWatched: watchedProduct,
  myOrders: myOrdersSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      // immutableCheck: { warnAfter: 128 },
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   warnAfter: 128,
      // },
    }),
});
export const persistor = persistStore(store);
