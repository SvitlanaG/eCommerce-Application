import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import MainPage from '@/pages/MainPage';

vi.mock('@/components/Main/Links', () => ({
  default: () => <div>Mocked Links</div>,
}));

describe('MainPage component', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(MainPage());

    expect(getByText('Welcome to Book Lounge Online')).toBeTruthy();
    expect(getByAltText('orange books')).toBeTruthy();
    expect(getByText(/Start Your Reading Adventure Today!/i)).toBeTruthy();
  });

  it('renders the Links component', () => {
    const { getByText } = render(MainPage());
    const linksComponent = getByText('Mocked Links');
    expect(linksComponent).toBeTruthy();
  });
});
