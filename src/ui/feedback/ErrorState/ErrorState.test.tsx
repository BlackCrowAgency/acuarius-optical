import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorState } from '@/ui';

test('ErrorState renders fallback text', () => {
  render(<ErrorState>Something went wrong</ErrorState>);
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});
