import { Errors } from '@/types/Errors';
import Toast from '@/helpers/Toast';
import { getCart } from './cart';

const emptyCart = async () => {
  const myHeaders = new Headers();
  const token = localStorage.getItem('userAccessToken');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    `Bearer ${token || localStorage.getItem('visitorIdentifier')}`,
  );

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
  };

  const cartId = localStorage.getItem('cartId');
  let cartVersion;

  await getCart().then((cartInfo): void => {
    if (cartInfo) {
      cartVersion = cartInfo.version;
    }
  });

  try {
    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/carts/${cartId}?version=${cartVersion}`,
      requestOptions,
    );
    if (!response.ok) {
      const { message }: Errors = await response.json();
      Toast({
        message: 'Something went wrong',
        status: 'error',
      });
      throw new Error(`${message}`);
    }
    Toast({
      message: 'You have successfully emptied the cart!',
      status: 'success',
    });
    localStorage.removeItem('cartId');
    return true;
  } catch (error) {
    return false;
  }
};

export default emptyCart;
