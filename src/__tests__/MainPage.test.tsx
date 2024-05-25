import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import MainPage from '@/pages/MainPage/MainPage';

// Mock the Links component
vi.mock('../components/Main/Links', () => ({
  default: () => <div>Mocked Links</div>,
}));

describe('MainPage component', () => {
  it('renders the main container', () => {
    render(<MainPage />);

    // Check for the main container
    const container = screen.getByText('Hi there').closest('div');
    expect(container).toBeInTheDocument();
  });

  it('renders the greeting message correctly', () => {
    render(<MainPage />);

    // Check for the greeting message
    const message = screen.getByText(/Hi there/i);
    expect(message).toBeInTheDocument();
  });

  it('renders the IoBookOutline icon', () => {
    render(<MainPage />);

    // Check for the icon
    const icon = screen.getByTestId('IoBookOutlineIcon');
    expect(icon).toBeInTheDocument();
  });

  it('renders the Links component', () => {
    render(<MainPage />);

    // Check for the Links component
    const linksComponent = screen.getByText('Mocked Links');
    expect(linksComponent).toBeInTheDocument();
  });
});
