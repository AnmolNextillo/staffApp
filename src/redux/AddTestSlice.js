// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, classTest } from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitAddTest = createAsyncThunk("hitAddTest", async (payload) => {
  try {

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };

    console.log("Config ===> ",config)
    const url = ApiBaseUrl + classTest;      
    const response = await axios.post(url,payload,config);
    console.log("Response Add Test===> ",response.data)
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});

const AddTestSlice = createSlice({
  name: "addTestReducer",

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearAddTest: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitAddTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitAddTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitAddTest.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearAddTest } = AddTestSlice.actions;
export default AddTestSlice.reducer;