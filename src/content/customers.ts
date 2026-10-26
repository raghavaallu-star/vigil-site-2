import type { Customer } from "./types";

/**
 * Approved customer logos.
 *
 * Leave EMPTY until each customer has given written approval to be named.
 * When this list is empty the logo section is hidden on every page and the
 * "Built for cement" equipment strip is shown instead.
 *
 * Example (do not uncomment without approval):
 * { name: "Example Cement Ltd", logoSrc: "/logos/example.svg", logoWidth: 140, logoHeight: 40 }
 */
export const customers: Customer[] = [];

export const customersSection = {
  heading: "Trusted by cement producers",
};
