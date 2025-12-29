import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/layout/Header';

describe('Header', () => {
  test('renderiza sin crashear (sin props)', () => {
    const H: any = Header;
    const { container } = render(<H />);
    expect(container.firstChild).toBeTruthy();
  });

  test('acepta props básicas (brand/nav/cta) sin crashear', () => {
    const H: any = Header;
    const props: any = {
      brand: { label: 'MyApp', href: '/' },
      nav: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
      ],
      cta: { label: 'Get started', href: '#get-started' },
      sticky: true,
    };
    const { container } = render(<H {...props} />);
    expect(container.firstChild).toBeTruthy();
  });
});
