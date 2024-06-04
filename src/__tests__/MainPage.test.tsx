import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import MainPage from '@/pages/MainPage/MainPage';

// Mock the Links component
vi.mock('@/components/Main/Links', () => ({
  default: () => <div>Mocked Links</div>,
}));

describe('MainPage component', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(MainPage());

    // Assert that the welcome message is rendered
    expect(getByText('Welcome to Book Lounge Online')).toBeTruthy();

    // Assert that the image is rendered with the correct alt text
    expect(getByAltText('orange books')).toBeTruthy();

    // Assert that the content is rendered
    expect(getByText(/Start Your Reading Adventure Today!/i)).toBeTruthy();
  });

  it('renders the Links component', () => {
    const { getByText } = render(MainPage());

    // Check for the Links component
    const linksComponent = getByText('Mocked Links');
    expect(linksComponent).toBeTruthy();
  });
});
