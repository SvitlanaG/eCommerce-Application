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
  });
});
