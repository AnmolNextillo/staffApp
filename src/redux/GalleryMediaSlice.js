// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, galleryMedia } from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitGalleryMedia = createAsyncThunk("hitGalleryMedia", async (payload) => {
  try {

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };

    console.log("Config ===> ",config)
    const url = ApiBaseUrl + galleryMedia;      
    const response = await axios.post(url,payload,config);
    console.log("Response Add Test===> ",response.data)
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});

const GalleryMediaSlice = createSlice({
  name: "galleryMediaReducer",

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearGalleryMedia: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitGalleryMedia.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitGalleryMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitGalleryMedia.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearGalleryMedia } = GalleryMediaSlice.actions;
export default GalleryMediaSlice.reducer;