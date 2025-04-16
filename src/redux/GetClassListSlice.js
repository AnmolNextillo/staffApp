// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, classList, subjectLists} from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitClassList = createAsyncThunk("hitClassList", async (payload) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + classList;
    console.log("URL ====> ",url)
    const response = await axios.post(url,payload,config);
    console.log("Response Class List===> ",response.data);
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});
const GetClassListSlice = createSlice({
  name: "getClassReducer",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearClassList: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitClassList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitClassList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitClassList.rejected, (state) => {
        state.isError = false;
      });
  },
});
export const { clearClassList } = GetClassListSlice.actions;
export default GetClassListSlice.reducer;