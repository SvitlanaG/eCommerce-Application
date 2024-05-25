import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '@/components/Header/Header';
import { store } from '@/store/store';
import '@testing-library/jest-dom';

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        {' '}
        {/* Wrap Header with Provider */}
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    const productName = screen.getByText('Book Lounge Online');
    expect(productName).toBeInTheDocument();

    const slogan = screen.getByText(
      'Between Codes and Coffee, Find Time for Books',
    );
    expect(slogan).toBeInTheDocument();
  });
});
