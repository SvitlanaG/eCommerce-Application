export type AddressShipping = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type AddressBilling = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
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
