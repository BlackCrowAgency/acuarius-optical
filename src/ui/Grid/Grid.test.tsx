import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Grid } from '@/ui';

test('Grid renders multiple children', () => {
  render(
    <Grid>
      <div>Item</div>
      <div>Item</div>
      <div>Item</div>
    </Grid>
  );
  const items = screen.getAllByText(/item/i);
  expect(items.length).toBeGreaterThanOrEqual(3);
});
