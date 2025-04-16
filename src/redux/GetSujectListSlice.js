// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiBaseUrl, subjectLists} from "../utils/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const hitSubjectList = createAsyncThunk("hitSubjectList", async (payload) => {
  try {

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization:token
      },
    };
    const url = ApiBaseUrl + subjectLists;      
    console.log("URL ====> ",url)
    const response = await axios.post(url,payload,config);
    console.log("Response Subject List===> ",response.data)
    return response.data;
  } catch (error) {
    console.log("Error ===> ",error)
    throw error.response.data;
  }
});

const GetSubjectListSlice = createSlice({
  name: "getSubjectReducer",

  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    clearSubjectList: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hitSubjectList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hitSubjectList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(hitSubjectList.rejected, (state) => {
        state.isError = false;
      });
  },
});

export const { clearSubjectList } = GetSubjectListSlice.actions;
export default GetSubjectListSlice.reducer;