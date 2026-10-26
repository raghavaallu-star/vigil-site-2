import type { Testimonial } from "./types";

/**
 * Approved testimonials.
 *
 * Leave EMPTY until the person quoted and their company have approved the
 * exact wording. When this list is empty the testimonial section is hidden.
 *
 * Example (do not uncomment without approval):
 * { quote: "…", name: "Full Name", title: "Plant Head", company: "Example Cement Ltd" }
 */
export const testimonials: Testimonial[] = [];

export const testimonialsSection = {
  eyebrow: "In their words",
  heading: "What plant teams say",
};
