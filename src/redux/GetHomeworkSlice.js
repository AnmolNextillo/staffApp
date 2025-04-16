// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, getHomeWorkList} from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitHomework = createAsyncThunk("hitHomework", async (payload) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + getHomeWorkList;
    console.log("URL ====> ",url,"  Payload ===>",payload)
    const response = await axios.post(url,payload,config);
    console.log("Response Homework List===> ",response.data);
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});
const GetHomeworkSlice = createSlice({
  name: "getHomeworkReducer",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearHomeworkList: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitHomework.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitHomework.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitHomework.rejected, (state) => {
        state.isError = false;
      });
  },
});
export const { clearHomeworkList } = GetHomeworkSlice.actions;
export default GetHomeworkSlice.reducer;