import Toast from '@/helpers/Toast';
import { Errors } from '@/types/Errors';

export const createCart = async () => {
  const token = localStorage.getItem('userAccessToken');
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    `Bearer ${token || localStorage.getItem('visitorIdentifier')}`,
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
  productIds: string[];
  quantity: number[];
  lineItems: { id: string; productId: string; quantity: number }[];
} | null> => {
  const token = localStorage.getItem('userAccessToken');
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    `Bearer ${token || localStorage.getItem('visitorIdentifier')}`,
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
    const {
      id,
      version,
      lineItems,
    }: {
      id: string;
      version: number;
      lineItems: { id: string; productId: string; quantity: number }[];
    } = await response.json();
    const productIds = lineItems.map((el) => el.productId);
    const quantity = lineItems.map((el) => el.quantity);
    return { id, version, productIds, quantity, lineItems };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === '404') {
        try {
          await createCart();
          const cart = await getCart();
          if (cart)
            return {
              id: cart.id,
              version: cart.version,
              quantity: cart.quantity,
              productIds: cart.productIds,
              lineItems: cart.lineItems,
            };
        } catch (createError) {
          return null;
        }
      }
    }
    return null;
  }
};

export const updateCart = async (cartId: string, productId: string) => {
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
    Toast({
      message: 'The book was successfully added to the cart!',
      status: 'success',
    });
    return true;
  } catch (error) {
    Toast({
      message: 'Something went wrong. Try again later!',
      status: 'error',
    });
    return false;
  }
};
