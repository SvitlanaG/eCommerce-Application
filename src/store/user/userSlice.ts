import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/UserType';

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
  },
  addressBilling: {
    street: '',
    city: '',
    postalCode: '',
    country: '',
  },
  token: '',
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
  },
});

export const { emailFill, passwordFill } = userSlice.actions;

export default userSlice.reducer;
