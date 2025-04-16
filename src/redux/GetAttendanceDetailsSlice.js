// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, attendanceDetails} from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitAttendenceDetials = createAsyncThunk("hitAttendenceDetials", async (payload) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + attendanceDetails;
    console.log("URL ====> ",url,"  Payload ===>",payload)
    const response = await axios.post(url,payload,config);
    console.log("Response Attendence Detils===> ",response.data);
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});
const GetAttendanceDetailsSlice = createSlice({
  name: "getAttendenceDetailsReducer",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearAttendenceDetails: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitAttendenceDetials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitAttendenceDetials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitAttendenceDetials.rejected, (state) => {
        state.isError = false;
      });
  },
});
export const { clearAttendenceDetails } = GetAttendanceDetailsSlice.actions;
export default GetAttendanceDetailsSlice.reducer;