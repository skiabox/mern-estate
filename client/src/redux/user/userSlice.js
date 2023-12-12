import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false
};

//create a slice with a name of 'user'
//action is the data we get from the database
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: state => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

//export the 3 functions as actions
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
