import { Errors } from '@/types/Errors';

const removeFromCart = async (
  cartId: string,
  version: number,
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
      throw new Error(`${message}`);
    }
    alert('Success');
    return true;
  } catch (error) {
    return false;
  }
};

export default removeFromCart;
