import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from '@/ui';

test('Badge shows its label', () => {
  render(<Badge>New</Badge>);
  expect(screen.getByText('New')).toBeInTheDocument();
});
