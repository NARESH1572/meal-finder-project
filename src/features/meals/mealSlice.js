

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categories: [],
  meals: [],
  selectedMeal: null,
};

export const fetchCategories = createAsyncThunk('meals/fetchCategories', async () => {
  const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
  return res.data.categories;
});

export const fetchMealsByCategory = createAsyncThunk('meals/fetchMealsByCategory', async (category) => {
  const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  return res.data.meals || [];
});

export const fetchMealsByName = createAsyncThunk('meals/fetchMealsByName', async (name) => {
  const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  return res.data.meals || [];
});

export const fetchMealById = createAsyncThunk('meals/fetchMealById', async (id) => {
  const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  return res.data.meals[0];
});

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchMealsByCategory.fulfilled, (state, action) => {
        state.meals = action.payload;
      })
      .addCase(fetchMealsByName.fulfilled, (state, action) => {
        state.meals = action.payload;
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.selectedMeal = action.payload;
      });
  },
});

export default mealSlice.reducer;

