import {createSlice} from '@reduxjs/toolkit/';

interface AuthState {
  id: string;
  email: string;
  accesstoken: string;
  fullname: string;
  photoUrl: string;
}

const initialState: {
  id: string;
  email: string;
  accesstoken: string;
  fullname: string;
  photoUrl: string;
} = {
  id: '',
  email: '',
  accesstoken: '',
  fullname: '',
  photoUrl: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      const {id, email, accesstoken, fullname, photoUrl} = action.payload;
      state.authData = {id, email, accesstoken, fullname, photoUrl};
    },

    removeAuth: (state, action) => {
      state.authData = initialState;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth} = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
