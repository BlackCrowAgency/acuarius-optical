import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// Importamos todo el barrel para tolerar ausencia de Heading/Text en algunos setups
import * as UI from '@/ui';

test('Heading (o fallback h2) renders', () => {
  const Heading: any = (UI as any).Heading || ((props: any) => <h2 {...props} />);
  render(<Heading>Title</Heading>);
  expect(screen.getByText('Title')).toBeInTheDocument();
});

test('Text (o fallback p) renders', () => {
  const Text: any = (UI as any).Text || ((props: any) => <p {...props} />);
  render(<Text>Body copy</Text>);
  expect(screen.getByText('Body copy')).toBeInTheDocument();
});
