import React from 'react';
import { Button } from '@/ui';

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
};

export const Basic = {
  args: { children: 'Button' },
};

export const Disabled = {
  args: { children: 'Disabled', disabled: true },
};

export const AsLink = {
  args: {
    children: 'As link (noop)',
    // href solo si tu Button lo soporta; si no, ignóralo
    // href: '#',
  },
};
