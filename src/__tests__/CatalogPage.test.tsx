import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import CatalogPage from '@/pages/CatalogPage/CatalogPage';

describe('CatalogPage component', () => {
  it('renders the CatalogPage component correctly', () => {
    render(<CatalogPage />);

    // Check if the main container is rendered
    const container = screen.getByTestId('catalog-container');
    expect(container).toBeInTheDocument();

    // Initially, there should be no books rendered
    const books = screen.queryAllByAltText('book');
    expect(books).toHaveLength(0);
  });
});
