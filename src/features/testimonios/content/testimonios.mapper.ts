import { testimoniosSchema } from "@/content/schemas/testimonios.schema";
import type { TestimoniosContent } from "@/content/schemas/testimonios.schema";

export type TestimoniosProps = Omit<TestimoniosContent, "kind">;

export function mapTestimoniosContent(input: unknown): TestimoniosProps {
  const parsed = testimoniosSchema.parse(input);
  const { kind, ...props } = parsed;
  return props;
}

export default mapTestimoniosContent;
