/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      //   console.log("Sending data:", formData);
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Sending data:", formData);
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const checkAuth = createAsyncThunk(
    "/auth/check-auth",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/check-auth",
          { 
            withCredentials: true,
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              Expires: '0'
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error("Auth check error:", error.response?.data);
        return rejectWithValue(error.response?.data || "Authentication check failed");
      }
    }
  );
  

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }).addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = !action.payload.success? null :action.payload.user;
        state.isAuthenticated = !action.payload.success?false:true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }).addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("Check Auth Response:", action.payload);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
