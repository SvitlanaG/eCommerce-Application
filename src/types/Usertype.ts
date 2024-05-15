export type Adress = {
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
  address: Adress;
  token?: string;
};
