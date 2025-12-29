import React from 'react';
import { Grid } from '@/ui';

export default {
  title: 'UI/Grid',
  component: Grid,
  tags: ['autodocs'],
};

const Card = ({ i }: { i: number }) => (
  <div
    style={{
      background: 'rgba(0,0,0,0.06)',
      padding: 16,
      borderRadius: 12,
      textAlign: 'center',
      fontWeight: 600,
    }}
  >
    Item {i}
  </div>
);

export const ThreeColumns = {
  render: (args: any) => (
    <Grid {...args}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} i={i + 1} />
      ))}
    </Grid>
  ),
};

export const Dense = {
  render: (args: any) => (
    <Grid {...args}>
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i} i={i + 1} />
      ))}
    </Grid>
  ),
};
