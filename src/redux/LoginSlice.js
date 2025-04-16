// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, loginApi } from "../utils/Constants";

export const hitLogin = createAsyncThunk("hitLogin", async (payload) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = ApiBaseUrl + loginApi;      
    const response = await axios.post(url, payload, config);
    console.log("Response ===> ",response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const LoginSlice = createSlice({
  name: "loginReducer",

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearLoginData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitLogin.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearLoginData } = LoginSlice.actions;
export default LoginSlice.reducer;