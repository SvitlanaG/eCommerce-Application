import { Errors } from '@/types/Errors';
import { Book, Data, Product } from '@/types/products';

const getBooks = async (urlEnd: string): Promise<Product[]> => {
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
    const url = `${import.meta.env.VITE_CTP_PROJECT_KEY}/product-projections/${urlEnd}`;
    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/${url}`,
      requestOptions,
    );
    if (!response.ok) {
      const { statusCode }: Errors = await response.json();
      throw new Error(`${statusCode}`);
    }
    const resp: Data = await response.json();
    const products: Product[] = resp.results.map((el: Book, ind: number) => {
      const product: Product = {
        id: el.id,
        categories: el.categories,
        description: el.description,
        name: el.name,
        price:
          el.masterVariant.prices.length > 0
            ? el.masterVariant.prices[0].value
            : null,
        assetSources:
          el.masterVariant.assets.length > 0
            ? el.masterVariant.assets[0].sources
            : [],
        key: resp.results[ind].key,
        sku: el.masterVariant.sku,
      };
      return product;
    });
    return products;
  } catch (error) {
    return [];
  }
};

export const getBookById = async (productId: string) => {
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
      `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-projections/${productId}`,
      requestOptions,
    );
    if (!response.ok) {
      const { statusCode }: Errors = await response.json();
      throw new Error(`${statusCode}`);
    }
    const result: Book = await response.json();

    const { id, categories, description, name, masterVariant, key } = result;
    const { sku, prices, assets } = masterVariant;
    const assetSources = assets.length > 0 ? assets[0].sources : [];
    const price = prices.length > 0 ? prices[0].value : null;
    const extractedData = {
      id,
      categories,
      description,
      name,
      assetSources,
      price,
      key,
      sku,
    };
    return extractedData;
  } catch (error) {
    return null;
  }
};

export default getBooks;
