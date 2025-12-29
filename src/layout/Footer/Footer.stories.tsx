import React from 'react';
import Footer from '@/layout/Footer';

export default {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
};

export const Default = {
  render: () => {
    const F: any = Footer;
    return <F />;
  },
};

export const WithLinks = {
  render: () => {
    const F: any = Footer;
    const props: any = {
      brand: { label: 'MyApp', href: '/' },
      links: [
        { label: 'Docs', href: '#docs' },
        { label: 'Blog', href: '#blog' },
        { label: 'Changelog', href: '#changelog' },
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
    return <F {...props} />;
  },
};
