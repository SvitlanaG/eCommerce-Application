import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage';
import { store } from '@/store/store';

describe('RegistrationPage component', () => {
  it('renders the registration page correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </Provider>,
    );

    // Check for the main heading
    const heading = screen.getByText('Create New Customer Account');
    expect(heading).toBeInTheDocument();

    // Check for input fields
    const firstNameInput = screen.getByLabelText(/first name \*/i);
    const lastNameInput = screen.getByLabelText(/last name \*/i);
    const emailInput = screen.getByLabelText(/email \*/i);
    const passwordInput = screen.getByLabelText('Password *', {
      selector: '#password',
    });
    const confirmPasswordInput = screen.getByLabelText('Confirm password *', {
      selector: '#confirmPassword',
    });
    const countrySelect = screen.getByLabelText('Country *', {
      selector: '#country',
    });
    const streetInput = screen.getByLabelText('Street *', {
      selector: '#street',
    });
    const cityInput = screen.getByLabelText('City *', {
      selector: '#city',
    });
    const postalCodeInput = screen.getByLabelText('Postal code *', {
      selector: '#code',
    });

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(countrySelect).toBeInTheDocument();
    expect(streetInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(postalCodeInput).toBeInTheDocument();

    // Check for submit button
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();

    // Check for the link to login page
    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
