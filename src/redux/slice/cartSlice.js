import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    cartItems: [],
    shippinginfo: {},
  },
  reducers: {
    addToCart(state, action) {
      console.log("action", action.payload);
      const item = action.payload;
      const IsItemExist = state.cartItems.find((i) => i.book === item.book);
      if (IsItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.book === IsItemExist.book ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    removeCartItem(state, action) {
      console.log(action.payload);
      console.log(state);
      let newCart = [];
      newCart = state.cartItems.filter((i) => {
        return i.book !== action.payload;
      });
      console.log(newCart);
      return {
        ...state,
        cartItems: newCart,
      };
    },
    saveShippingInfo(state, action) {
      return {
        ...state,
        shippinginfo: action.payload,
      };
    },
    clearCartItem(state, action) {
      return {
        ...state,
        cartItems: [],
      };
    },
  },
});

export const { addToCart, removeCartItem, saveShippingInfo, clearCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
