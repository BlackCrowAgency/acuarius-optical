import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Alert } from '@/ui';

test('Alert renders with message', () => {
  render(<Alert>Heads up!</Alert>);
  expect(screen.getByText(/heads up!/i)).toBeInTheDocument();
});
