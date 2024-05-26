import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/UserType';

const initialState: User = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addressShipping: {
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefaultAddress: false,
    isBillingAddress: false,
  },
  addressBilling: {
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefaultAddress: false,
  },
  token: '',
  isLoggedIn: !!localStorage.getItem('userAccessToken'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    emailFill: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    passwordFill: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { emailFill, passwordFill, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
