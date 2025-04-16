// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, logout } from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitLogout = createAsyncThunk("hitLogout", async (payload) => {
  try {

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + logout;      
    const response = await axios.post(url, payload,config);
    console.log("Response ===> ",response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const LogoutSlice = createSlice({
  name: "logoutReducer",

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearLogoutData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitLogout.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearLogoutData } = LogoutSlice.actions;
export default LogoutSlice.reducer;