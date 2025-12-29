import React from 'react';
import { Section, Container } from '@/ui';

export default {
  title: 'UI/Section',
  component: Section,
  tags: ['autodocs'],
};

const Content = ({ title = 'Section title', body = 'Lorem ipsum dolor sit amet.' }) => (
  <div style={{ display: 'grid', gap: 8 }}>
    <h3 style={{ fontSize: 20, fontWeight: 600 }}>{title}</h3>
    <p style={{ opacity: 0.8 }}>{body}</p>
  </div>
);

export const Default = {
  render: (args: any) => (
    <Section {...args}>
      <Container>
        <Content />
      </Container>
    </Section>
  ),
};

export const Muted = {
  args: { /* theme: 'muted', spacing: 'lg' */ },
  render: (args: any) => (
    <Section {...args}>
      <Container>
        <Content title="Muted surface" />
      </Container>
    </Section>
  ),
};

export const Brand = {
  args: { /* theme: 'brand', spacing: 'lg' */ },
  render: (args: any) => (
    <Section {...args}>
      <Container>
        <Content title="Brand surface" />
      </Container>
    </Section>
  ),
};
