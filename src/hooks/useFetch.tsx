import { useState, useEffect } from 'react';
import getCategories from '@/services/catalog';
import { Category } from '@/types/categories';

export const useFetch = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  return categories;
};

export default useFetch;
