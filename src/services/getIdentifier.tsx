import { UserToken } from '../types/UserType';

const getVisitorIdentifier = async () => {
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
    const { access_token: accessToken }: UserToken = await (
      await fetch(
        `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/rssecommercefinal/anonymous/token?grant_type=client_credentials`,
        requestOptions,
      )
    ).json();
    localStorage.setItem('visitorIdentifier', accessToken);
  } catch (error) {
    getVisitorIdentifier();
  }
};

export default getVisitorIdentifier;
