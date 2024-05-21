import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Links from '../components/Main/Links';
import '@testing-library/jest-dom';

describe('Links component', () => {
  it('renders login and sign up links correctly', () => {
    render(
      <MemoryRouter>
        <Links />
      </MemoryRouter>,
    );

    // Check for login link
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');

    // Check for sign up link
    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/register');
  });
});
