// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, updateAttendanceDetails} from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitUpdateAttendence = createAsyncThunk("hitUpdateAttendence", async (payload) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + updateAttendanceDetails;
    console.log("URL ====> ",url,"  Payload ===>",payload)
    const response = await axios.put(url,payload,config);
    console.log("Response Attendence Detils===> ",response.data);
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});
const UpdateAttendanceDetailsSlice = createSlice({
  name: "updateAttendenceReducer",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearUpdateAttendenceDetails: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitUpdateAttendence.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitUpdateAttendence.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitUpdateAttendence.rejected, (state) => {
        state.isError = false;
      });
  },
});
export const { clearUpdateAttendenceDetails } = UpdateAttendanceDetailsSlice.actions;
export default UpdateAttendanceDetailsSlice.reducer;