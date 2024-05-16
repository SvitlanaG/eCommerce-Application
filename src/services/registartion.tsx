import { User } from '../types/Usertype';

const registartion = async (data: User) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('tokenForAll')}`,
    );
    // describe your data here
    const raw = JSON.stringify(data);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const response = await (
      await fetch(
        'https://api.europe-west1.gcp.commercetools.com/rssecommercefinal/customers',
        requestOptions,
      )
    ).json();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export default registartion;
