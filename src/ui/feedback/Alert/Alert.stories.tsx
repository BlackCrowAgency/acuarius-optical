import React from 'react';
import { Alert } from '@/ui';

export default {
  title: 'UI/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
};

export const Info = {
  args: {
    // variant: 'info',  // descomenta si tu Alert soporta variant
    children: 'Heads up! This is an informational alert.',
  },
};

export const Success = {
  args: {
    // variant: 'success',
    children: 'Success — your changes have been saved.',
  },
};

export const Warning = {
  args: {
    // variant: 'warning',
    children: 'Warning — please check your input.',
  },
};

export const Danger = {
  args: {
    // variant: 'danger',
    children: 'Error — something went wrong.',
  },
};
