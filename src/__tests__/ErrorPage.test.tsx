import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';

describe('ErrorPage component', () => {
  it('renders the error page correctly', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    // Check for the image
    const image = screen.getByAltText('orange book');
    expect(image).toBeInTheDocument();

    // Check for the main heading
    const heading = screen.getByText('404 Page Not Found');
    expect(heading).toBeInTheDocument();

    // Check for the descriptive text
    const description = screen.getByText(
      /Sorry, the page you are looking for does not exist. Return to our home page to continue your journey./i,
    );
    expect(description).toBeInTheDocument();

    // Check for the home link
    const homeLink = screen.getByText('go home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
