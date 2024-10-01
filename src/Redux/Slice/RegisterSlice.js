import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://employee-system-nodejs.vercel.app/api/company/register",
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.isSuccess) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue("Registration failed. Please try again.");
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    companyName: "",
    companyStartedDate: "",
    companyMobileNumber: "",
    companyAddress1: "",
    companyAddress2: "",
    companyEmail: "",
    gstNo: "",
    city: "",
    state: "",
    country: "",
    password: "",
    confirmPassword: "",
    companyLogo: "",
    status: 'idle',
    error: null,
  },
  reducers: {
    setRegisterField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setRegisterField } = registerSlice.actions;

export default registerSlice.reducer;
