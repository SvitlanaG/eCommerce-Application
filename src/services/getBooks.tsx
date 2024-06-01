import { Book, Data, Product } from '@/types/products';

const getBooks = async (): Promise<Product[]> => {
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

    const resp: Data = await (
      await fetch(
        `${import.meta.env.VITE_CTP_API_URL}/rssecommercefinal/product-projections`,
        requestOptions,
      )
    ).json();
    console.log(resp);
    const products: Product[] = resp.results.map((el: Book, ind: number) => {
      const product: Product = {
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

export default getBooks;
