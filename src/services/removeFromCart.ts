import { Errors } from '@/types/Errors';
import Toast from '@/helpers/Toast';
import { getCart } from './cart';

const removeFromCart = async (
  cartId: string,
  // version: number,
  lineItemId: string,
  quantity: number = 1,
) => {
  const myHeaders = new Headers();
  const token = localStorage.getItem('userAccessToken');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    `Bearer ${token || localStorage.getItem('visitorIdentifier')}`,
  );

  let version;

  await getCart().then((cartInfo): void => {
    if (cartInfo) {
      version = cartInfo.version;
    }
  });

  console.log(version);

  const raw = JSON.stringify({
    version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: `${lineItemId}`,
        quantity,
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/carts/${cartId}`,
      requestOptions,
    );
    if (!response.ok) {
      const { message }: Errors = await response.json();
      Toast({
        message: 'Something went wrong. Please reload your page',
        status: 'error',
      });
      throw new Error(`${message}`);
    }
    Toast({
      message: 'The book was successfully removed from the cart!',
      status: 'success',
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default removeFromCart;
