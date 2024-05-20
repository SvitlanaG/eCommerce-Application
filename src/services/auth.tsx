import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';
import { User, UserLogin, UserToken } from '../types/UserType';
import { ErrorReg } from '../types/ErrorReg';

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
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Basic dUpzVExhY2lQbFFHNVBlU0ZQWUwtVW45Ok9VMWlQUTdRR2laVEYxdklTejYtM2lrOVhXcHk1dlJZ',
    );

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
    toast.success('login successful', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    navigate('/');
  } catch (error) {
    toast.error(`${error}`, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
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
    toast.success('registration successful', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    await Login({ email: data.email, password: data.password }, navigate);
  } catch (error) {
    toast.error(`${error}`, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    console.error('ssss:', error);
  }
};
