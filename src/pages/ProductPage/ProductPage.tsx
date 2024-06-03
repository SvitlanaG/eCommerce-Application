// import { useEffect, useState } from 'react';
// import { Book } from '@/types/products';
// import getBookInfo from '@/services/getBookInfo';

import { useParams } from 'react-router-dom';

const ProductPage = () => {
  // const [book, setBook] = useState<Book>({} as Book);
  // useEffect(() => {
  //   getBookInfo();
  // }, []);

  const { key } = useParams();

  return <div>{key}</div>;
};

export default ProductPage;
