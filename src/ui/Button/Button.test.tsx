import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/ui';

test('Button renders with text and role=button', () => {
  render(<Button>Click me</Button>);
  const btn = screen.getByRole('button', { name: /click me/i });
  expect(btn).toBeInTheDocument();
});

test('Disabled button is disabled', () => {
  render(<Button disabled>Disabled</Button>);
  const btn = screen.getByRole('button', { name: /disabled/i });
  expect(btn).toBeDisabled();
});
