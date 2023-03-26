import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
const user = JSON.parse(localStorage.getItem('user'))
const Admin = JSON.parse(localStorage.getItem('Admin'))
const initialState = {
  Admin: Admin ? Admin : null,
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}
export const register = createAsyncThunk('auth/regsiter', async(user, thunkAPI) => {
    try{
        return await authService.register(user)
    }
    catch(error){
        const message = (error.repsonse && error.response.data && error.response.data.message) ||error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
  localStorage.removeItem('user')
})

export const forgotpassword = createAsyncThunk('auth/forgotpassword', async (user, thunkAPI) => {
try{
  await authService.forgotpassword(user)

}
catch(error){
    const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
    return thunkAPI.rejectWithValue(message)
}
})

export const LoginAdmin = createAsyncThunk('auth/LoginAdmin', async (Admin, thunkAPI) => {
  try {
    return await authService.LoginAdmin(Admin)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const authslice = createSlice({
    name: 'auth',
    initialState,
   reducers: {
    reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
    }
   },
   extraReducers : (builder) => {
    builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state,action) =>{
           state.isLoading = false 
           state.isSuccess = true
           state.user = action.payload
           state.Admin = null
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
            state.Admin = null
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
          state.Admin = null
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
          state.Admin = null
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null
          state.Admin = null
        })
        .addCase(forgotpassword.pending, (state, action) => {
          state.isLoading = true
        })
        .addCase(LoginAdmin.pending, (state) => {
          state.isLoading = true
        })
        .addCase(LoginAdmin.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.Admin = action.payload
          state.user = null
        })
        .addCase(LoginAdmin.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
          state.Admin = null
        })   }

})

export const {reset} = authslice.actions
export default authslice.reducer