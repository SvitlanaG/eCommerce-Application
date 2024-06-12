import { Errors } from '@/types/Errors';

export const updateCart = async (
  cartId: string,
  version: number,
  productId: string,
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    `Bearer ${localStorage.getItem('visitorIdentifier')}`,
  );

  const raw = JSON.stringify({
    version,
    actions: [
      {
        action: 'addLineItem',
        productId: `${productId}`,
        variantId: 1,
        quantity: 1,
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
    return true;
  } catch (error) {
    return false;
  }
};

export const createCart = async () => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    `Bearer ${localStorage.getItem('visitorIdentifier')}`,
  );

  const raw = JSON.stringify({
    currency: 'USD',
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/carts`,
      requestOptions,
    );
    if (!response.ok) {
      const { statusCode }: Errors = await response.json();
      throw new Error(`${statusCode}`);
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const getCart = async (): Promise<{
  id: string;
  version: number;
} | null> => {
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

  try {
    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/active-cart`,
      requestOptions,
    );
    if (!response.ok) {
      const { statusCode }: Errors = await response.json();
      throw new Error(`${statusCode}`);
    }
    const { id, version }: { id: string; version: number } =
      await response.json();
    return { id, version };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === '404') {
        try {
          await createCart();
          const cart = await getCart();
          if (cart) return { id: cart.id, version: cart.version };
        } catch (createError) {
          return null;
        }
      }
    }
    return null;
  }
};
