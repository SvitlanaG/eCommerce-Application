import getBooks from '@/services/getBooks';
import { Category } from '@/types/categories';
import { Product } from '@/types/products';

export const getDiscounted = (
  book: Product,
  discounted: ({ sku: string; value: number } | null)[],
) => {
  return (
    +((book?.price?.centAmount ?? 0) / 100).toFixed(2) -
    +(
      +(discounted.find((discount) => discount?.sku === book.sku)?.value ?? 0) /
      100
    ).toFixed(2)
  );
};

export const filterBooks = async (
  language: string,
  priceRange: number | null,
  item: Category,
  limitBooks: Product[],
) => {
  try {
    const books = await getBooks('');

    return books.filter((book: Product) => {
      const isCategoryMatch = book.categories.some(
        (category) => category.id === item.id,
      );

      const isLanguageMatch = language
        ? Object.keys(book.name).includes(language)
        : true;

      let isPriceMatch = true;
      if (priceRange) {
        const priceInCents = book.price?.centAmount ?? 0;
        if (priceRange === 100) {
          isPriceMatch = priceInCents >= 100 * 100;
        } else {
          isPriceMatch =
            priceInCents >= priceRange * 100 &&
            priceInCents <= (priceRange + 30) * 100;
        }
      }
      const isLimitedMatch = limitBooks.map((el) => el.id).includes(book.id);
      return (
        isCategoryMatch && isLanguageMatch && isPriceMatch && isLimitedMatch
      );
    });
  } catch (error) {
    return [];
  }
};

export const sortCondition = (book: Product, books: Product[]) => {
  const key = books.find((el) => el.key === book.key)?.key;
  if (key) {
    return key === book.key;
  }
  return false;
};

export const calculateTotal = (
  books: Product[],
  discounted: ({ sku: string; value: number } | null)[],
  quantities: { [key: string]: number },
) => {
  return books.reduce((total: number, book: Product) => {
    const quantity = quantities[book.id] || 1;
    return total + getDiscounted(book, discounted) * quantity;
  }, 0);
};

export default getDiscounted;
