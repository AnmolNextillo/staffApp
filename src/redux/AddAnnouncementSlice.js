// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addAnnouncementApi, ApiBaseUrl } from "../utils/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addAnnouncement = createAsyncThunk("addAnnouncement", async (payload) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };

     console.log("payload data add annouement===>", payload);
    const url = ApiBaseUrl + addAnnouncementApi;      
    const response = await axios.post(url, payload, config);
    console.log("Response data add announcement ===> ",response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const AddAnnouncementSlice = createSlice({
  name: "addAnnouncementReducer",

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearAddAnnouncementData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAnnouncement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnnouncement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(addAnnouncement.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearAddAnnouncementData } = AddAnnouncementSlice.actions;
export default AddAnnouncementSlice.reducer;