import React from 'react';
import { Container } from '@/ui';

export default {
  title: 'UI/Container',
  component: Container,
  tags: ['autodocs'],
};

const Box = ({ label }: { label: string }) => (
  <div style={{ background: 'rgba(0,0,0,0.08)', padding: 16, borderRadius: 8 }}>
    {label}
  </div>
);

export const Default = {
  render: (args: any) => (
    <Container {...args}>
      <Box label="Container default" />
    </Container>
  ),
};

export const WithLongContent = {
  render: (args: any) => (
    <Container {...args}>
      <div style={{ display: 'grid', gap: 12 }}>
        <Box label="Fila 1" />
        <Box label="Fila 2" />
        <Box label="Fila 3" />
      </div>
    </Container>
  ),
};
