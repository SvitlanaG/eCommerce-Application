import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import { store } from '../store/store';

describe('LoginPage component', () => {
  it('renders the login page correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    // Check for the main heading
    const heading = screen.getByText('Log in to Your Account');
    expect(heading).toBeInTheDocument();

    // Check for email input field
    const emailInput = screen.getByLabelText(/email \*/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');

    // Check for password input field
    const passwordInput = screen.getByLabelText(/password \*/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Check for submit button
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();

    // Check for the link to registration page
    const registerLink = screen.getByText(/sign up/i);
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
