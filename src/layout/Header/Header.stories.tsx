import React from 'react';
import Header from '@/layout/Header';

export default {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
};

// Story minimalista (sin props). Si tu Header requiere props, usa la variante "WithNav".
export const Default = {
  render: () => {
    const H: any = Header;
    return <H />;
  },
};

// Variante con navegación/CTA (estructura de ejemplo; ajusta a tu API real si difiere)
export const WithNav = {
  render: () => {
    const H: any = Header;
    const props: any = {
      brand: { label: 'MyApp', href: '/' },
      nav: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Contact', href: '#contact' },
      ],
      cta: { label: 'Get started', href: '#get-started' },
      sticky: true,
      transparentOnTop: false,
      collapseBreakpoint: 'lg',
    };
    return <H {...props} />;
  },
};
