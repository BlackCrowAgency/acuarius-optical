// src/ui/index.ts

// ------------------------------
// Controls
// ------------------------------
export { default as Button } from './Button';
export * from './Button'; // (opcional) expone tipos/variantes si existen

// ------------------------------
// Layout primitives
// ------------------------------
export { default as Container } from './Container';
export * from './Container';

export { default as Section } from './Section';
export * from './Section';

export { default as Grid } from './Grid';
export * from './Grid';

// ------------------------------
// Typography
// Debe existir src/ui/Typography/index.ts que re-exporte Heading/Text
// Ej: export { default as Heading } from './Heading'; export { default as Text } from './Text';
// Asegúrate de tener:
// Barrel raíz de UI
export { default as Typography } from "./Typography";
export { Heading, Text } from "./Typography";

// ------------------------------
// Badges / Chips
// ------------------------------
export { default as Badge } from './Badge';
export * from './Badge';

// ------------------------------
// Feedback
// ------------------------------
export { default as Alert } from './feedback/Alert';
export * from './feedback/Alert';

export { default as ErrorState } from './feedback/ErrorState';
export * from './feedback/ErrorState';
