import React from 'react';
import { ErrorState } from '@/ui';

export default {
  title: 'UI/Feedback/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
};

export const Basic = {
  args: {
    // title: 'Something went wrong',   // si tu componente lo soporta
    // description: 'Try again later.', // idem
    children: 'Something went wrong. Try again later.',
  },
};

export const WithRetry = {
  args: {
    children: 'We could not load the content.',
    // actionLabel: 'Retry', onAction: () => {} // si tu API lo soporta
  },
};
