import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import '@testing-library/jest-dom';

describe('ProfilePage component', () => {
  it('renders ProfilePage component without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </Provider>,
    );

    // Check if all elements are rendered
    expect(screen.getByText('Your Profile')).toBeInTheDocument();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('Address Information')).toBeInTheDocument();
  });

  it('renders ProfilePage with modal closed by default', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      </Provider>,
    );

    // Check if modal is closed by default
    expect(screen.queryByTestId('close-button')).toBeNull();
    expect(screen.queryByTestId('submit-button')).toBeNull();
  });
});
