import { UserToken } from '@/types/UserType';

const getVisitorIdentifier = async () => {
  const tokenData = localStorage.getItem('identifiers');

  if (tokenData) {
    const {
      accessToken,
      expiration,
    }: { accessToken: string; expiration: number } = JSON.parse(tokenData);
    const currentTime = new Date().getTime();
    if (currentTime < expiration) {
      return accessToken;
    }
  }

  try {
    const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
    const authHeader = btoa(`${clientId}:${clientSecret}`);

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Basic ${authHeader}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
    };

    const response = await fetch(
      `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }

    const { access_token: accessToken, expires_in: expires }: UserToken =
      await response.json();

    const expiration = new Date().getTime() + expires * 1000;
    localStorage.setItem(
      'visitorIdentifier',
      JSON.stringify({ accessToken, expiration }),
    );
    localStorage.setItem('visitorIdentifier', accessToken);
    localStorage.setItem(
      'identifiers',
      JSON.stringify({ accessToken, expiration }),
    );

    return accessToken;
  } catch (error) {
    return null;
  }
};

export default getVisitorIdentifier;
