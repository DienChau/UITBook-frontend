import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    clear: (state, action) => {
      state.error = null;
      state.message = null;
      state.status = null;
      state.success = null;
      state.registerSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerRequest.pending, (state, action) => {
        console.log("pending");
        state.loading = true;
      })
      .addCase(registerRequest.fulfilled, (state, action) => {
        console.log("fullfill");
        state.loading = false;

        state.success = action.payload.success;
        state.registerSuccess = true;
      })
      .addCase(registerRequest.rejected, (state, action) => {
        console.log("reject");
        state.loading = false;
        state.success = action.payload.success;
        state.error = action.payload.message;
        state.registerSuccess = false;
      })
      .addCase(loginRequest.pending, (state, action) => {
        console.log("pending");
        state.loading = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        console.log("fullfill");
        state.loading = false;
        state.isAuthenticated = true;
        console.log("action", action.payload.user);
        state.user = action.payload.user;
        state.error = action.payload.message;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        console.log("reject");
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload.message;
      })
      .addCase(logoutRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.status = action.payload.success;
        // persistor.purge();
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        state.status = action.payload.success;
      })
      .addCase(loadUser.pending, (state, action) => {
        console.log("pending loaduser");
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        console.log("fulfilled loaduser");
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = action.payload.message;
      })
      .addCase(loadUser.rejected, (state, action) => {
        console.log("rejected loaduser");
        state.loading = false;
        // state.isAuthenticated = true;
        // state.user = action.payload.user;
        state.error = action.payload.message;
      });
  },
});

export const registerRequest = createAsyncThunk(
  "user/registration",
  async ({ name, email, password, avatar }, { rejectWithValue }) => {
    const newUser = { name, email, password, avatar };
    console.log("registerRequest", newUser);
    try {
      const response = await axios.post("/api/v2/registration", {
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      });
      console.log("data", response.data);
      return response.data;
    } catch (err) {
      console.log("registerRequestEror", err.response.data);
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginRequest = createAsyncThunk(
  "user/registerUserRequest",
  async ({ email, password }, { rejectWithValue }) => {
    const newUser = {
      email,
      password,
    };
    console.log("user/registerUserRequest", newUser);
    try {
      const response = await axios.post("/api/v2/login", {
        email,
        password,
      });
      console.log("data", response.data);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);
export const logoutRequest = createAsyncThunk(
  "user/logoutRequest",
  async () => {
    const data = await axios
      .get("/api/v2/logout")
      .then((res) => {
        console.log("user/logoutRequest", res.data);
        return res.data;
      })
      .catch((err) => {
        console.log("user/logoutRequest", err);
        return err;
      });

    return data;
  }
);
export const loadUser = createAsyncThunk("user/loadUser", async () => {
  const data = await axios
    .get("/api/v2/me", { withCredentials: true })
    .then((res) => res.data)
    .catch((err) => err);

  return data;
});

export const { clear } = userSlice.actions;
export default userSlice.reducer;
