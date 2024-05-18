export type AddressShipping = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultAddress: boolean;
  isBillingAddress: boolean;
};

export type AddressBilling = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultAddress: boolean;
};

export type User = {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addressShipping: AddressShipping;
  addressBilling: AddressBilling;
  token?: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserToken = {
  access_token: string;
  refresh_token: string;
  expires_in: string;
};
