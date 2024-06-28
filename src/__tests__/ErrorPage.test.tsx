import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import ErrorPage from '@/pages/ErrorPage';

describe('ErrorPage component', () => {
  it('renders the error page correctly', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    const image = screen.getByAltText('orange book');
    expect(image).toBeInTheDocument();

    const heading = screen.getByText('404 Page Not Found');
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      /Sorry, the page you are looking for does not exist. Return to our home page to continue your journey./i,
    );
    expect(description).toBeInTheDocument();

    const homeLink = screen.getByText('go home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
