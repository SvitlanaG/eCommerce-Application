import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Links from '@/components/Main/Links';
import '@testing-library/jest-dom';

describe('Links component', () => {
  it('renders the catalog link correctly', () => {
    render(
      <MemoryRouter>
        <Links />
      </MemoryRouter>,
    );

    // Check for catalog link
    const catalogLink = screen.getByRole('link', { name: /catalog/i });
    expect(catalogLink).toBeInTheDocument();
    expect(catalogLink).toHaveAttribute('href', '/catalog');
  });
});
