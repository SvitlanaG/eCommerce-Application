import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import { store } from '@/store/store';

describe('RegistrationForm component', () => {
  it('renders the RegistrationForm correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegistrationForm />
        </MemoryRouter>
      </Provider>,
    );

    // Check for input fields
    const firstNameInput = screen.getByLabelText(/first name \*/i);
    const lastNameInput = screen.getByLabelText(/last name \*/i);
    const emailInput = screen.getByLabelText(/email \*/i);
    const passwordInput = screen.getByLabelText('Password *');
    const confirmPasswordInput = screen.getByLabelText('Confirm password *');
    const countryShippingSelect = screen.getByLabelText('Country *', {
      selector: '#countryShipping',
    });
    const streetShippingInput = screen.getByLabelText('Street *', {
      selector: '#streetShipping',
    });
    const cityShippingInput = screen.getByLabelText('City *', {
      selector: '#cityShipping',
    });
    const postalShippingInput = screen.getByLabelText('Postal Code *', {
      selector: '#postalShipping',
    });

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(countryShippingSelect).toBeInTheDocument();
    expect(streetShippingInput).toBeInTheDocument();
    expect(cityShippingInput).toBeInTheDocument();
    expect(postalShippingInput).toBeInTheDocument();

    // Check for submit button
    const submitButton = screen.getByText('Register');
    expect(submitButton).toBeInTheDocument();

    // Check for the link to login page
    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
