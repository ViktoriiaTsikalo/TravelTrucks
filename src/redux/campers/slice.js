import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCampersById } from "./operations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    campers: [],
    camper: null,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    total: 0, // додаємо total для пагінації
    isLoading: false,
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      if (state.favorites.includes(camperId)) {
        state.favorites = state.favorites.filter((id) => id !== camperId);
      } else {
        state.favorites.push(camperId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.page === 1) {
          state.campers = action.payload.items; // заміна карток
        } else {
          state.campers = [...state.campers, ...action.payload.items]; // додаємо до існуючих
        }
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCampersById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCampersById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.camper = action.payload;
        state.error = null;
      })
      .addCase(fetchCampersById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
