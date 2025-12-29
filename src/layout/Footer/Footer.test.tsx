import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/layout/Footer';

describe('Footer', () => {
  test('renderiza sin crashear (sin props)', () => {
    const F: any = Footer;
    const { container } = render(<F />);
    expect(container.firstChild).toBeTruthy();
  });

  test('acepta links/social/legal sin crashear', () => {
    const F: any = Footer;
    const props: any = {
      brand: { label: 'MyApp', href: '/' },
      links: [
        { label: 'Docs', href: '#docs' },
        { label: 'Blog', href: '#blog' },
      ],
      social: [
        { label: 'Twitter', href: 'https://x.com' },
        { label: 'GitHub', href: 'https://github.com' },
      ],
      legal: [
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
      ],
      bottomNote: '© 2025 MyApp Inc.',
    };
    const { container } = render(<F {...props} />);
    expect(container.firstChild).toBeTruthy();
  });
});
