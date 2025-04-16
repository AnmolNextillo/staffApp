// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl,testDetails } from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitTestDetail = createAsyncThunk("hitTestDetail", async (payload) => {
  try {

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + testDetails;     
    console.log("url ===> ",url) 
    const response = await axios.post(url,payload,config);
   
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});

const GetTestDetailSlice = createSlice({
  name: "getTestDetailReducer",

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearTestDetail: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitTestDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitTestDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitTestDetail.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearTestDetail } = GetTestDetailSlice.actions;
export default GetTestDetailSlice.reducer;