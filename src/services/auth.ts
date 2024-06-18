import { NavigateFunction } from 'react-router-dom';
import { User, UserLogin, UserToken } from '@/types/UserType';
import { Errors } from '@/types/Errors';
import Toast from '@/helpers/Toast';
import getVisitorIdentifier from '@/services/getIdentifier';

export const signIn = async (data: UserLogin) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('visitorIdentifier')}`,
    );

    const raw = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      'https://api.europe-west1.gcp.commercetools.com/rssecommercefinal/me/login',
      requestOptions,
    );
    if (!response.ok) {
      const { message }: Errors = await response.json();
      throw new Error(`${message}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getUserToken = async (data: UserLogin) => {
  try {
    const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
    const authHeader = btoa(`${clientId}:${clientSecret}`);

    const myHeaders: Headers = new Headers();
    myHeaders.append('Authorization', `Basic ${authHeader}`);

    const raw = '';

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      `https://auth.europe-west1.gcp.commercetools.com/oauth/rssecommercefinal/customers/token?grant_type=password&username=${data.email}&password=${data.password}`,
      requestOptions,
    );
    if (!response.ok) {
      const { message }: Errors = await response.json();
      throw new Error(`${message}`);
    }
    const { access_token: accessToken }: UserToken = await response.json();
    localStorage.setItem('userAccessToken', accessToken);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const login = async (data: UserLogin, navigate: NavigateFunction) => {
  try {
    await signIn(data);
    await getUserToken(data);
    Toast({ message: 'login successful', status: 'success' });
    await getVisitorIdentifier();
    navigate('/');
  } catch (error) {
    Toast({ message: `${error}`, status: 'error' });
  }
};

export const registration = async (data: User, navigate: NavigateFunction) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('visitorIdentifier')}`,
    );

    // Prepare shipping and billing addresses
    const shipping = {
      country: data.addresses[0].country,
      streetName: data.addresses[0].streetName,
      city: data.addresses[0].city,
      postalCode: data.addresses[0].postalCode,
      isDefaultAddress: data.addresses[0].isDefaultAddress,
    };
    let billing = null;
    let raw = null;
    if (!data.addresses[0].isBillingAddress) {
      billing = {
        country: data.addresses[1].country,
        streetName: data.addresses[1].streetName,
        city: data.addresses[1].city,
        postalCode: data.addresses[1].postalCode,
        isDefaultAddress: data.addresses[1].isDefaultAddress,
      };

      raw = JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        addresses: [shipping, billing],
        shippingAddresses: [0],
        billingAddresses: [1],
        defaultShippingAddress: data.addresses[0].isDefaultAddress
          ? 0
          : undefined,
        defaultBillingAddress: data.addresses[1].isDefaultAddress
          ? 1
          : undefined,
      });
    } else {
      raw = JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        addresses: [shipping],
        shippingAddresses: [0],
        billingAddresses: [0],
        defaultShippingAddress: data.addresses[0].isDefaultAddress
          ? 0
          : undefined,
        defaultBillingAddress: data.addresses[0].isDefaultAddress
          ? 0
          : undefined,
      });
    }

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      'https://api.europe-west1.gcp.commercetools.com/rssecommercefinal/customers',
      requestOptions,
    );
    if (!response.ok) {
      const { message }: Errors = await response.json();
      throw new Error(`${message}`);
    }
    Toast({ message: 'registration successful', status: 'success' });
    await login({ email: data.email, password: data.password }, navigate);
  } catch (error) {
    Toast({ message: `${error}`, status: 'error' });
  }
};
