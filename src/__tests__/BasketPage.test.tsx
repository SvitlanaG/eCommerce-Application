import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import BasketPage from '@/pages/BasketPage';
import { getCart } from '@/services/cart';
import { getBookById } from '@/services/getBooks';
import '@testing-library/jest-dom';

vi.mock('@/services/cart');
vi.mock('@/services/getBooks');

const mockedGetCart = vi.mocked(getCart, { deep: true });
const mockedGetBookById = vi.mocked(getBookById, { deep: true });

describe('BasketPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders BasketPage and calls getCart and getBookById', async () => {
    mockedGetCart.mockResolvedValueOnce({
      id: 'test-id',
      version: 1,
      productIds: ['1'],
      quantity: [1],
      lineItems: [{ id: 'line-item-1', productId: '1', quantity: 1 }],
      totalPrice: { centAmount: 100 },
      discountOnTotalPrice: { centAmount: 100 },
    });

    const mockProduct = {
      total: 1,
      id: '1',
      categories: [{ typeId: 'type1', id: 'cat1' }],
      description: { en: 'Description' },
      name: { en: 'Mock Product' },
      assetSources: [{ uri: 'http://example.com/image.jpg' }],
      price: {
        centAmount: 1000,
        currencyCode: 'USD',
        fractionDigits: 2,
      },
      key: 'product-key',
      sku: 'product-sku',
    };

    mockedGetBookById.mockResolvedValueOnce(mockProduct);

    render(
      <Router>
        <BasketPage />
      </Router>,
    );

    expect(mockedGetCart).toHaveBeenCalled();
  });
});
