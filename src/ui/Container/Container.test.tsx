import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Container } from '@/ui';

test('Container renders its children', () => {
  render(
    <Container>
      <span>Inside container</span>
    </Container>
  );
  expect(screen.getByText(/inside container/i)).toBeInTheDocument();
});
