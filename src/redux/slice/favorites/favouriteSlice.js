import axios from "axios";

export const addItemsToFavourite = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v2/book/${id}`);
  // const { data } = await axios({
  //   method: "GET",
  //   url: `/api/v2/book/${id}`,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "multipart/form-data",
  //   },
  // }).catch((error) => {
  //   console.log("error addItemsToFavourite : ", error.message);
  // });
  // console.log("data: ", data);
  dispatch({
    type: "ADD_TO_FAVOURITE",
    payload: {
      book: data.book._id,
      name: data.book.name,
      price: data.book.price,
      image: data.book.images[0].url,
      stock: data.book.Stock,
      author: data.book.author,
    },
  });
};

// Remove from Favorite
export const removeItemsFromFavorite = (id) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FAVORITE_ITEM",
    payload: id,
  });
};

export const clearFavorite = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR",
  });
  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

let initialState = {
  favouriteItems: [],
};

export default function favouriteSlice(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_FAVOURITE":
      const item = action.payload;
      const isItemExist = state.favouriteItems.find(
        (i) => i.book === item.book
      );
      if (isItemExist) {
        return {
          ...state,
          favouriteItems: state.favouriteItems.map((i) =>
            i.book === isItemExist.book ? item : i
          ),
        };
      } else {
        return {
          ...state,
          favouriteItems: [item, ...state.favouriteItems],
        };
      }
    case "REMOVE_FAVORITE_ITEM":
      return {
        ...state,
        favouriteItems: state.favouriteItems.filter(
          (i) => i.book !== action.payload
        ),
      };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}
