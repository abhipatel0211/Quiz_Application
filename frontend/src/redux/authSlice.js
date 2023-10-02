import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  msg: "",
  user: null, // Change user to null to indicate an empty user object
  token: "",
  loading: false,
  error: "",
};

// Use different action names for login and signup
export const signUpUser = createAsyncThunk("user/signup", async (user) => {
  const response = await fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  // console.log(data);
  return data; // Return the response data from the API
});

export const signInUser = createAsyncThunk(
  "user/signIn",
  async (credentials) => {
    try {
      // Make the API request here to sign in the user
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const data = await response.json();
      return data; // The user data received from the API
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, { payload }) => {
      state.token = payload;
      const d = new Date();
      const expiresInMinutes = 5; // Set the expiration time in minutes
      d.setTime(d.getTime() + expiresInMinutes * 60 * 1000); // Convert minutes to milliseconds
      let expires = "expires=" + d.toUTCString();
      document.cookie = `token=${payload}; ${expires}; path=/;`;
      Cookies.set("token", payload, { expires: expiresInMinutes / (24 * 60) });
      // ... token expiration and storage code ...
    },
    addUser: (state, action) => {
      state.user = action.payload;
      // ...  user storage code ...
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
      // ... logout code to clear storage ...
    },
  },
  extraReducers: {
    [signInUser.pending]: (state) => {
      state.loading = true;
    },
    [signInUser.fulfilled]: (
      state,
      { payload: { error, msg, user, token } }
    ) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
        state.user = user; // Update the user object
        state.token = token;
        // ... storage code for msg, token, and user ...
      }
    },
    [signInUser.rejected]: (state) => {
      state.loading = false;
    },
    [signUpUser.pending]: (state) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, { payload: { error, msg } }) => {
      state.loading = false;
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
      }
    },
    [signUpUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { addToken, addUser, logout } = authSlice.actions;
export default authSlice.reducer;
