import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const API = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 4, filters = {} }, thunkAPI) => {
    try {
      // Передаємо всі фільтри як params, щоб бекенд їх врахував
      const response = await API.get("/campers", {
        params: { page, limit, ...filters },
      });
      return response.data; // { total, items }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCampersById = createAsyncThunk(
  "campers/fetchCampersById",
  async (id, thunkAPI) => {
    try {
      const response = await API.get(`/campers/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
