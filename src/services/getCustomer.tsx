import { User } from '@/types/UserType';

const getCustomer = async (): Promise<User | null> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const token = localStorage.getItem('userAccessToken');

    if (token) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    } else {
      throw new Error('No token found');
    }

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/rssecommercefinal/me`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const customer: User = await response.json();
    return customer;
  } catch (error) {
    // console.error('Error fetching customer data:', error);
    return null;
  }
};

export default getCustomer;
