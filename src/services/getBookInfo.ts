import { Errors } from '@/types/Errors';

const getBookInfo = async () => {
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

  const response = await fetch(`url`, requestOptions);
  if (!response.ok) {
    const { message }: Errors = await response.json();
    throw new Error(`${message}`);
  }
};

export default getBookInfo;
