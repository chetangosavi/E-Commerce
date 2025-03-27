/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productsList: [],
};

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (formData) => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/admin/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (formData) => {
    try {
      const result = await axios.get(
        "http://localhost:8000/api/admin/all/products"
      )
      if(!result){
        console.log("No Products Available")
      }
      console.log("result data: ",result.data)
      return result?.data;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong ! No Products Available")
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, formData }) => {
    try {
      const result = await axios.put(
        `http://localhost:8000/api/admin/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async ({id}) => {
      try {
        const result = await axios.delete(
          `http://localhost:8000/api/admin/delete/${id}`);

          
        return result?.data;
      } catch (error) {
        console.log(error);
      }
    }
  );

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

    builder.addCase(fetchAllProducts.pending, (state)=>{
        state.isLoading = true
    }).addCase(fetchAllProducts.fulfilled, (state,action)=>{
        state.isLoading = false,
        console.log("Payload in action: ",action.payload)
        state.productsList = action.payload;

    }).addCase(fetchAllProducts.rejected , (state,action)=>{
        state.isLoading = false,
        state.productsList = []
    })
  },
});


export default adminProductSlice.reducer;
