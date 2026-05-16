import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import { type Driver, type DriverState } from "../../types/driverTypes";
import { API_URL } from "../context";
import axios from 'axios';

const DRIVER_API_URL = `${API_URL}/api/driver`;

const initialState: DriverState = {
  driver: null,
  isLoading: false,
  error: null,
  message: null,
};

// --- Async Thunks ---

export const createDriver = createAsyncThunk(
  "driver/createDriver",
  async (driverData: {
    vehicle: {
      type: string;
      images: File[];
      truckCategory?: string;
      registrationNumber?: string;
    };
    operationTimes: any;
    alcoholDelivery: boolean;
    documents: {
      idOrPassport: File | null;
      criminalClearance: File | null;
      driversLicence: File | null;
      vehicleRegistration: File | null;
    };
  }, thunkAPI) => {
    try {
      const formData = new FormData();

      // Add vehicle data
      formData.append('vehicleType', driverData.vehicle.type);
      if (driverData.vehicle.truckCategory) {
        formData.append('truckCategory', driverData.vehicle.truckCategory);
      }
      if (driverData.vehicle.registrationNumber) {
        formData.append('registrationNumber', driverData.vehicle.registrationNumber);
      }

      // Add vehicle images
      driverData.vehicle.images.forEach((image) => {
        formData.append('vehicleImages', image);
      });

      // Add operation times
      formData.append('operationTimes', JSON.stringify(driverData.operationTimes));

      // Add alcohol delivery preference
      formData.append('alcoholDelivery', driverData.alcoholDelivery.toString());

      // Add documents
      if (driverData.documents.idOrPassport) {
        formData.append('idOrPassport', driverData.documents.idOrPassport);
      }
      if (driverData.documents.criminalClearance) {
        formData.append('criminalClearance', driverData.documents.criminalClearance);
      }
      if (driverData.documents.driversLicence) {
        formData.append('driversLicence', driverData.documents.driversLicence);
      }
      if (driverData.documents.vehicleRegistration) {
        formData.append('vehicleRegistration', driverData.documents.vehicleRegistration);
      }

      const response = await api.post(`${DRIVER_API_URL}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.driver as Driver;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error creating driver account");
    }
  }
);

// Fetch driver profile
export const fetchDriverProfile = createAsyncThunk(
  'driver/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/drivers/profile');
      return response.data.driver;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// Toggle live status
export const toggleDriverLive = createAsyncThunk(
  'driver/toggleLive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/drivers/toggle-live');
      return response.data.driver;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle live status');
    }
  }
);

// --- Slice ---
const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setDriver(state, action: PayloadAction<DriverState["driver"]>) {
      state.driver = action.payload;
    },
    clearDriver(state) {
      state.driver = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createDriver
      .addCase(createDriver.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDriver.fulfilled, (state, action: PayloadAction<Driver>) => {
        state.isLoading = false;
        state.driver = action.payload;
        state.message = "Driver account created successfully! Please wait for admin approval.";
      })
      .addCase(createDriver.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchProfile
      .addCase(fetchDriverProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDriverProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.driver = action.payload;
      })
      .addCase(fetchDriverProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // toggleLive
      .addCase(toggleDriverLive.fulfilled, (state, action) => {
        if (state.driver) {
          state.driver.isLive = action.payload.isLive;
        }
      });
  },
});

export const { clearError, clearMessage, setDriver, clearDriver } = driverSlice.actions;
export default driverSlice.reducer;
