export type Address = {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultAddress: boolean;
};

/* export type AddressShipping = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultAddress: boolean;
  isBillingAddress: boolean;
}; */

/* export type AddressBilling = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultAddress: boolean;
}; */

export type User = {
  id: string;
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
