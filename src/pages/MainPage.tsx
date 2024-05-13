import { useEffect } from 'react';
import { getBooks } from '../services/getData';

const MainPage = () => {
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div>
      <h2>Hello from main</h2>
    </div>
  );
};

export default MainPage;
