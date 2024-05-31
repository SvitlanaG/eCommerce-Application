import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/UserType';

const initialState: User = {
  id: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [
    {
      id: '',
      streetName: '',
      city: '',
      postalCode: '',
      country: '',
      isDefaultAddress: false,
      isBillingAddress: false,
    },
  ],
  defaultShippingAddressId: '',
  defaultBillingAddressId: '',
  shippingAddressIds: [],
  billingAddressIds: [],
  token: '',
  isLoggedIn: !!localStorage.getItem('userAccessToken'),
  version: 0,
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
