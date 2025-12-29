import React from 'react';
// Si tu barrel exporta Heading y Text:
import { Heading, Text } from '@/ui';
// Si no existen, usa <h1>/<p> nativos o ajusta imports.

export default {
  title: 'UI/Typography',
  tags: ['autodocs'],
};

export const Headings = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      {/* Reemplaza por <Heading as="h1" /> si tu lib lo usa así */}
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </div>
  ),
};

export const BodyText = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      {/* Reemplaza por <Text size="lg|md|sm" /> si tienes ese API */}
      <p style={{ fontSize: 18 }}>Lead / Large text</p>
      <p>Regular paragraph</p>
      <p style={{ opacity: 0.7 }}>Muted paragraph</p>
    </div>
  ),
};
