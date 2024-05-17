import { toast } from 'react-toastify';
import { User } from '../types/UserType';

const registration = async (data: User) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('tokenForAll')}`,
    );
    const raw = JSON.stringify({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
      addresses: [
        {
          country: data.addressBilling.country,
          streetName: data.addressBilling.street,
          city: data.addressBilling.city,
          postalCode: data.addressBilling.postalCode,
        },
        {
          country: data.addressShipping.country,
          streetName: data.addressShipping.street,
          city: data.addressShipping.city,
          postalCode: data.addressShipping.postalCode,
        },
      ],
      billingAddresses: [0],
      shippingAddresses: [1],
      // defaultBillingAddress: 0,
      // defaultShippingAddress: 1,
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
      const errorData = await response.json();
      throw new Error(`${errorData.message}`);
    }
    const responseData = await response.json();
    console.log('sss:', responseData);
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

export default registration;
