// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl,  profile } from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitProfile = createAsyncThunk("hitProfile", async (payload) => {
  try {

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + profile;      
    const response = await axios.get(url,config);
    console.log("Response ===> ",response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const GetPRofileSlice = createSlice({
  name: "getProfileReducer",

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitProfile.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearProfile } = GetPRofileSlice.actions;
export default GetPRofileSlice.reducer;