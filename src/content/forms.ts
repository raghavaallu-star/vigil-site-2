/** Labels, options and messages for the lead forms. */

export const roleOptions = [
  "Plant Head",
  "VP / GM Operations",
  "Reliability Manager",
  "Maintenance Head",
  "Process / Energy Engineer",
  "CXO",
  "Other",
];

export const industryOptions = ["Cement", "Pharmaceuticals", "Oil & Gas", "Steel", "Automotive", "Other manufacturing"];

export const regionOptions = ["India", "Middle East", "Southeast Asia", "United States", "Other"];

export const interestOptions = [
  "Plant Data Historian",
  "Predictive Failure AI",
  "Engineer Mobile App",
  "Maintenance Management",
  "Reliability Excellence",
  "Energy & Process Optimization",
  "Plant Performance Governance",
];

export const formCopy = {
  fields: {
    name: "Full name",
    email: "Work email",
    company: "Company",
    role: "Role",
    region: "Region",
    industry: "Industry",
    plants: "Number of plants / production lines",
    plantsHint: "Optional, e.g. 2 plants, 5 lines",
    interests: "Areas of interest",
    message: "What would you like to discuss?",
    messageAssessment: "Tell us about your plant and main challenges",
    consent: "I agree that Vigil.AI may contact me about this request, as described in the",
    consentLink: "Privacy Policy",
    honeypot: "Leave this field empty",
    select: "Select…",
  },
  submit: { demo: "Request a Demo", assessment: "Request Assessment" },
  submitting: "Sending…",
  success: {
    heading: "Thanks, we've got it.",
    body: "Someone from our team will reply within two business days. In the meantime, have a look at how we deliver.",
    cta: "See our approach",
  },
  errors: {
    generic: "Something went wrong sending your request. Please try again, or email us directly.",
    rateLimited: "Too many requests from this connection. Please wait a few minutes and try again.",
    fix: "Please fix the highlighted fields.",
  },
  validation: {
    name: "Please enter your name.",
    email: "Please enter a valid work email.",
    company: "Please enter your company.",
    role: "Please choose your role.",
    region: "Please choose a region.",
    industry: "Please choose an industry.",
    message: "Please keep your message under 2,000 characters.",
    consent: "Please confirm so we can reply.",
  },
  required: "required",
};
