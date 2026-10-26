import { z } from "zod";
import { formCopy, industryOptions, regionOptions, roleOptions } from "@/content/forms";

const v = formCopy.validation;

/** Shared by the client form and the /api/lead route handler. */
export const leadSchema = z.object({
  kind: z.enum(["demo", "assessment"]),
  name: z.string().trim().min(2, v.name).max(100, v.name),
  email: z.string().trim().email(v.email).max(200, v.email),
  company: z.string().trim().min(2, v.company).max(150, v.company),
  role: z.string().refine((r) => roleOptions.includes(r), v.role),
  region: z.string().refine((r) => regionOptions.includes(r), v.region),
  industry: z.string().refine((r) => industryOptions.includes(r), v.industry),
  plants: z.string().trim().max(100).optional().or(z.literal("")),
  interests: z.array(z.string().max(80)).max(10).optional(),
  message: z.string().trim().max(2000, v.message).optional().or(z.literal("")),
  consent: z.literal(true, { error: v.consent }),
  // Spam protection: a hidden field humans never fill, and how long the form was open (ms).
  website: z.string().max(0).optional().or(z.literal("")),
  elapsedMs: z.number().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
