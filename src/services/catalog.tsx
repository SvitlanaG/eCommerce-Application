import { Discount } from '@/types/Discounts';
import { Errors } from '@/types/Errors';
import { Category } from '@/types/categories';

export const getDiscounts = async () => {
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
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-discounts`,
    requestOptions,
  );
  if (!response.ok) {
    const { message }: Errors = await response.json();
    throw new Error(`${message}`);
  }
  const discounts: Discount[] = (await response.json()).results.map(
    (el: Discount) => {
      return { predicate: el.predicate, value: el.value };
    },
  );
  return discounts;
};

export const getCategories = async (): Promise<Category[]> => {
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
      `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/categories`,
      requestOptions,
    );
    if (!response.ok) {
      const { message }: Errors = await response.json();
      throw new Error(`${message}`);
    }
    const categories: Category[] = (await response.json()).results.map(
      (item: Category) => {
        return {
          name: item.name,
          key: item.key,
          id: item.id,
        };
      },
    );
    return categories;
  } catch (error) {
    return [];
  }
};

export default getCategories;
