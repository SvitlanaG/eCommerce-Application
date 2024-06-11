import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import LoginPage from '@/pages/LoginPage';
import { store } from '@/store/store';

describe('LoginPage component', () => {
  it('renders the login page correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const heading = screen.getByText('Log in to Your Account');
    expect(heading).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email \*/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');

    const passwordInput = screen.getByLabelText(/password \*/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();

    const registerLink = screen.getByText(/sign up/i);
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
