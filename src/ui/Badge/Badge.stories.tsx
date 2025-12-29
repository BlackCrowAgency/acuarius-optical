import React from 'react';
import { Badge } from '@/ui';

export default {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export const Basic = {
  args: { children: 'New' },
};

export const LongLabel = {
  args: { children: 'Experimental feature' },
};
