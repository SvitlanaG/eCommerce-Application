import { NavigateFunction } from 'react-router-dom';
import { Errors } from '@/types/Errors';

const getBookInfo = async (key: string, navigate: NavigateFunction) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('visitorIdentifier')}`,
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/products/key=${key}`,
      requestOptions,
    );
    if (!response.ok) {
      navigate('/catalog');
      const { message }: Errors = await response.json();
      throw new Error(`${message}`);
    }
    const bookInfo = await response.json();
    return bookInfo;
  } catch (error) {
    return null;
  }
};

export default getBookInfo;
