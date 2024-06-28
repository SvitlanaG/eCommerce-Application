import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Footer from '@/components/Footer';

describe('Footer component', () => {
  it('renders all elements correctly', () => {
    render(<Footer />);

    const rsSchoolLink = screen.getByLabelText('RS School');
    expect(rsSchoolLink).toBeInTheDocument();
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/');

    const githubLinks = [
      { name: 'GitHub arastepa', href: 'https://github.com/arastepa' },
      { name: 'GitHub Maslovars', href: 'https://github.com/Maslovars' },
      { name: 'GitHub SvitlanaG', href: 'https://github.com/SvitlanaG' },
    ];

    githubLinks.forEach(({ name, href }) => {
      const link = screen.getByLabelText(name);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });

    const socialMediaLinks = [
      { name: 'Facebook', href: 'https://www.facebook.com' },
      { name: 'Instagram', href: 'https://www.instagram.com' },
      { name: 'Discord', href: 'https://discord.com/' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com' },
    ];

    socialMediaLinks.forEach(({ name, href }) => {
      const link = screen.getByLabelText(name);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });
});
