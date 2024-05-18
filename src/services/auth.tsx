import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';
import { User, UserLogin, UserToken } from '../types/UserType';
import { ErrorReg } from '../types/ErrorReg';

export const Login = async (data: UserLogin, navigate: NavigateFunction) => {
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

    const { access_token: accessToken }: UserToken = await (
      await fetch(
        `https://auth.europe-west1.gcp.commercetools.com/oauth/rssecommercefinal/customers/token?grant_type=password&username=${data.email}&password=${data.password}`,
        requestOptions,
      )
    ).json();
    localStorage.setItem('userAccessToken', accessToken);
    navigate('/');
  } catch (error) {
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
    if (data.addressShipping.isBillingAddress) billing = shipping;
    else {
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
      defaultBillingAddress: data.addressBilling.isDefaultAddress && 0,
      defaultShippingAddress: data.addressShipping.isDefaultAddress && 1,
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
      autoClose: 5000,
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
      autoClose: 5000,
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
