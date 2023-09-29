import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";
const Admin = JSON.parse(localStorage.getItem("Admin"));
const initialState = {
  Admin: Admin ? Admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// export const forgotpassword = createAsyncThunk('auth/forgotpassword', async (user, thunkAPI) => {
// try{
//   await adminService.forgotpassword(user)

// }
// catch(error){
//     const message =
//     (error.response && error.response.data && error.response.data.message) ||
//     error.message ||
//     error.toString()
//     return thunkAPI.rejectWithValue(message)
// }
// })

export const LoginAdmin = createAsyncThunk(
  "admin/LoginAdmin",
  async (Admin, thunkAPI) => {
    console.log(Admin);
    try {
      return await adminService.LoginAdmin(Admin);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const logout = createAsyncThunk("admin/logout", async () => {
  await adminService.logout();
});
export const adminslice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(logout.fulfilled, (state) => {
        state.Admin = null;
      })
      // .addCase(forgotpassword.pending, (state, action) => {
      //   state.isLoading = true
      // })
      // .addCase(forgotpassword.fulfilled)

      .addCase(LoginAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Admin = action.payload;
      })
      .addCase(LoginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.Admin = null;
      });
  },
});

export const { reset } = adminslice.actions;
export default adminslice.reducer;
