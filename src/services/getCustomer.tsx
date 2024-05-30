import Toast from '@/helpers/Toast';
import { User } from '@/types/UserType';

const getCustomer = async (): Promise<User | null> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const token = localStorage.getItem('userAccessToken');

    if (token) {
      myHeaders.append('Authorization', `Bearer ${token}`);
    } else {
      Toast({ message: 'No token found', status: 'error' });
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
      Toast({ message: 'Network response was not ok', status: 'error' });
    }

    const customer: User = await response.json();
    return customer;
  } catch (error) {
    Toast({ message: 'Error fetching customer data', status: 'error' });
    return null;
  }
};

export default getCustomer;
