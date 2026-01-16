import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios";

// Sync user with backend after Azure login
export const syncAzureUser = createAsyncThunk(
  "auth/syncAzureUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Sync error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Sync failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    azureAccount: null,
    isAuthenticated: false,
    loading: false, // Changed to false - we'll set it to true only when actively checking
  },
  reducers: {
    setAzureAccount: (state, action) => {
      state.azureAccount = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.azureAccount = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncAzureUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncAzureUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(syncAzureUser.rejected, (state, action) => {
        console.error("Sync rejected:", action.payload);
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setAzureAccount, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;