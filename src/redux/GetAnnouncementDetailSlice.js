// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { announcementDetailsApi, ApiBaseUrl } from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAnnouncementDetail = createAsyncThunk("getAnnouncementDetail", async (payload) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + announcementDetailsApi;     
    console.log("url ===> ",url) 
    const response = await axios.post(url,payload,config);
   
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});

const GetAnnouncementDetailSlice = createSlice({
  name: "getAnnouncementDetailReducer",

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearGetAnnouncementDetail: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncementDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnnouncementDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAnnouncementDetail.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearGetAnnouncementDetail } = GetAnnouncementDetailSlice.actions;
export default GetAnnouncementDetailSlice.reducer;