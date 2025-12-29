import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Section, Container } from '@/ui';

test('Section renders children (with Container)', () => {
  render(
    <Section>
      <Container>
        <p>Section content</p>
      </Container>
    </Section>
  );
  expect(screen.getByText(/section content/i)).toBeInTheDocument();
});
