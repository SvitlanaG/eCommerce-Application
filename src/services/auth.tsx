import { NavigateFunction } from 'react-router-dom';
import { User, UserLogin, UserToken } from '../types/UserType';
import { ErrorReg } from '../types/ErrorReg';
import Toast from '../helpers/Toast';
import { getAccessToken } from './getData';

export const SignIn = async (data: UserLogin) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('tokenForAll')}`,
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
      const { message }: ErrorReg = await response.json();
      throw new Error(`${message}`);
    }
  } catch (error) {
    console.log('signincust:', error);
    throw error;
  }
};

export const GetUserToken = async (data: UserLogin) => {
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
      const { message }: ErrorReg = await response.json();
      throw new Error(`${message}`);
    }
    const { access_token: accessToken }: UserToken = await response.json();
    localStorage.setItem('userAccessToken', accessToken);
  } catch (error) {
    console.error('token:', error);
    throw error;
  }
};

export const Login = async (data: UserLogin, navigate: NavigateFunction) => {
  try {
    await SignIn(data);
    await GetUserToken(data);
    Toast({ message: 'login successful', status: 'success' });
    await getAccessToken();
    navigate('/');
  } catch (error) {
    Toast({ message: `${error}`, status: 'error' });
    console.error(error);
  }
};

export const registration = async (data: User, navigate: NavigateFunction) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('tokenForAll')}`,
    );
    const shipping = {
      country: data.addressShipping.country,
      streetName: data.addressShipping.street,
      city: data.addressShipping.city,
      postalCode: data.addressShipping.postalCode,
    };
    let billing = null;
    let isDefault = data.addressBilling?.isDefaultAddress;
    if (data.addressShipping.isBillingAddress) {
      billing = shipping;
      isDefault = data.addressShipping?.isDefaultAddress;
    } else {
      billing = {
        country: data.addressBilling.country,
        streetName: data.addressBilling.street,
        city: data.addressBilling.city,
        postalCode: data.addressBilling.postalCode,
      };
    }
    const raw = JSON.stringify({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
      addresses: [billing, shipping],
      billingAddresses: [0],
      shippingAddresses: [1],

      defaultBillingAddress: isDefault ? 0 : undefined,
      defaultShippingAddress: data.addressShipping?.isDefaultAddress
        ? 1
        : undefined,
    });
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
      const { message }: ErrorReg = await response.json();
      throw new Error(`${message}`);
    }
    Toast({ message: 'registration successful', status: 'success' });
    await Login({ email: data.email, password: data.password }, navigate);
  } catch (error) {
    Toast({ message: `${error}`, status: 'error' });
    console.error('ssss:', error);
  }
};
