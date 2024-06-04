import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import getBookInfo from '@/services/getBookInfo';
import { Book } from '@/types/products';

const ProductPage = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (key) {
      getBookInfo(key, navigate).then((result) => {
        if (result) {
          setBook(result.masterData?.current);
        }
      });
    }
  }, [key, navigate]);

  console.log('book', book);

  return (
    <div>
      <div>
        <h2>{book?.name['en-GB']}</h2>
        <p>{book?.description['en-GB']}</p>
      </div>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            src={book?.masterVariant.assets?.[0]?.sources[0]?.uri}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={book?.masterVariant.assets?.[0]?.sources[1]?.uri}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={book?.masterVariant.assets?.[0]?.sources[2]?.uri}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <button type="button">Modal</button>
    </div>
  );
};

export default ProductPage;
