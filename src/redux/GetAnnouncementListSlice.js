// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { announcementListApi, ApiBaseUrl } from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const announcementList = createAsyncThunk("announcementList", async (payload) => {
  try {

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + announcementListApi;      
    const response = await axios.post(url,payload,config);
    console.log("Response announcementList ===> ",response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const GetAnnouncementListSlice = createSlice({
  name: "announcementListReducer",

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
      .addCase(announcementList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(announcementList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(announcementList.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearProfile } = GetAnnouncementListSlice.actions;
export default GetAnnouncementListSlice.reducer;