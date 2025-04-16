// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, attendance} from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitAttendence = createAsyncThunk("hitAttendence", async (payload) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + attendance;
    console.log("URL ====> ",url,"  Payload ===>",config)
    const response = await axios.post(url,payload,config);
    console.log("Response Attendence List===> ",response.data);
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});
const GetAttendenceSlice = createSlice({
  name: "getAttendenceReducer",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearAttendence: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitAttendence.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitAttendence.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitAttendence.rejected, (state) => {
        state.isError = false;
      });
  },
});
export const { clearAttendence } = GetAttendenceSlice.actions;
export default GetAttendenceSlice.reducer;