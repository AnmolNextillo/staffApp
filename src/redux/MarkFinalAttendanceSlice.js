// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, markFinalAttendance} from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitMarkAttendance = createAsyncThunk("hitMarkAttendance", async (payload) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + markFinalAttendance;
    console.log("URL ====> ",url,"  Payload ===>",payload)
    const response = await axios.put(url,payload,config);
    console.log("Response Attendence Detils===> ",response.data);
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});
const MarkFinalAttendanceSlice = createSlice({
  name: "markAttendanceReducer",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearMarkAttendance: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitMarkAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitMarkAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitMarkAttendance.rejected, (state) => {
        state.isError = false;
      });
  },
});
export const { clearMarkAttendance } = MarkFinalAttendanceSlice.actions;
export default MarkFinalAttendanceSlice.reducer;