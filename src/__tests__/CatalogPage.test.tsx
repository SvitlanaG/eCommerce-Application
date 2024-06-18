import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import CatalogPage from '@/pages/CatalogPage/CatalogPage';

// Mock the getBooks function
vi.mock('@/services/getBooks', () => ({
  default: () =>
    Promise.resolve([
      {
        categories: [{ typeId: '1', id: '2' }],
        description: { en: 'Description 1' },
        name: { en: 'Book 1' },
        assetSources: [{ uri: 'book1.jpg' }],
        price: { centAmount: 1000, currencyCode: 'USD', fractionDigits: 2 },
        key: '1',
        sku: 'SKU1',
      },
      {
        categories: [{ typeId: '3', id: '4' }],
        description: { en: 'Description 2' },
        name: { en: 'Book 2' },
        assetSources: [{ uri: 'book2.jpg' }],
        price: { centAmount: 1500, currencyCode: 'USD', fractionDigits: 2 },
        key: '2',
        sku: 'SKU2',
      },
      {
        categories: [{ typeId: '5', id: '6' }],
        description: { en: 'Description 3' },
        name: { en: 'Book 3' },
        assetSources: [{ uri: 'book3.jpg' }],
        price: { centAmount: 2000, currencyCode: 'USD', fractionDigits: 2 },
        key: '3',
        sku: 'SKU3',
      },
    ]),
}));

describe('CatalogPage component', () => {
  it('renders the CatalogPage component correctly', async () => {
    render(
      <Router>
        <CatalogPage />
      </Router>,
    );

    // Check if the main container is rendered
    const container = screen.getByTestId('catalog-container');
    expect(container).toBeTruthy();

    // Wait for the useEffect to fetch data and render books
    await screen.findAllByAltText('book');

    // Check if books are rendered after loading
    const updatedBooks = screen.getAllByAltText('book');
    expect(updatedBooks).toHaveLength(3);
  });
});
