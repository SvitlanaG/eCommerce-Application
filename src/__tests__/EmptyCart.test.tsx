import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import EmptyCart from '@/components/EmptyCart';

describe('EmptyCart component', () => {
  it('renders the EmptyCart component correctly', () => {
    render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>,
    );

    const image = screen.getByAltText('orange backpack');
    expect(image).toBeInTheDocument();

    const heading = screen.getByText('Your basket is currently empty.');
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      /Explore our online selection and uncover a book that fuels your next great idea!/i,
    );
    expect(description).toBeInTheDocument();

    const catalogLink = screen.getByText('Catalog');
    expect(catalogLink).toBeInTheDocument();
    expect(catalogLink).toHaveAttribute('href', '/catalog');
  });
});
