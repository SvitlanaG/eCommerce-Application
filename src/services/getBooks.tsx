import { Book, Data, Product } from '@/types/products';

const getBooks = async (
  sort: boolean,
  filter: boolean,
  value?: string,
  parameter?: string,
): Promise<Product[]> => {
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
    let url = `rssecommercefinal/product-projections`;
    if (sort)
      url = `rssecommercefinal/product-projections/search?sort=${value} ${parameter}`;
    else if (filter)
      url = `rssecommercefinal/product-projections/search?filter=${value} ${parameter}`;

    console.log(url);
    const resp: Data = await (
      await fetch(`${import.meta.env.VITE_CTP_API_URL}/${url}`, requestOptions)
    ).json();
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
