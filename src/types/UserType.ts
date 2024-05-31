export type Address = {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultAddress: boolean;
  isBillingAddress: boolean;
};

export type User = {
  id: string;
  version: number;
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  token?: string;
  isLoggedIn?: boolean;
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
