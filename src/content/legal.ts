/**
 * Legal copy. This is a starting draft only and MUST be reviewed by counsel
 * before launch (see README "Replace before launch").
 */

export const consentCopy = {
  heading: "Cookies and analytics",
  body: "We use privacy-friendly analytics only if you allow it. No advertising cookies.",
  accept: "Allow analytics",
  decline: "Decline",
  policyLink: "Privacy policy",
};

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalPage {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  seoDescription: string;
}

export const lastUpdatedLabel = "Last updated";

export const draftNotice = "Draft for legal review. This text is a template and is not yet final.";

export const privacyPage: LegalPage = {
  title: "Privacy Policy",
  updated: "2026-10-24",
  intro:
    "This policy explains what personal information Vigil.AI collects through this website, why we collect it and the choices you have.",
  seoDescription: "How Vigil.AI collects, uses and protects personal information submitted through this website.",
  sections: [
    {
      heading: "Information you give us",
      body: [
        "When you request a demo or a plant assessment we collect the details you enter in the form: name, work email, company, role, country and anything you write in the message field.",
        "We use this information only to respond to your request and to follow up about Vigil Reliability.",
      ],
    },
    {
      heading: "Analytics",
      body: [
        "If you allow analytics in the cookie banner, we use a privacy-focused analytics service to understand which pages are useful. Analytics is not loaded if you decline, and you can change your choice at any time from the Cookie settings link in the footer.",
      ],
    },
    {
      heading: "How we share information",
      body: [
        "We do not sell personal information. We share it only with service providers that help us operate this website and respond to enquiries, such as our email delivery and CRM providers, under appropriate agreements.",
      ],
    },
    {
      heading: "Retention",
      body: [
        "We keep enquiry information for as long as needed to respond and maintain a business relationship, and then delete or anonymize it.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Depending on where you live, you may have the right to access, correct or delete your personal information, or to object to certain processing. Contact us using the details below to make a request.",
      ],
    },
    {
      heading: "Contact",
      body: ["Questions about this policy can be sent to the email address listed on our Contact page."],
    },
  ],
};

export const termsPage: LegalPage = {
  title: "Terms of Use",
  updated: "2026-10-24",
  intro: "These terms govern your use of the Vigil.AI website. By using the site you agree to them.",
  seoDescription: "Terms governing use of the Vigil.AI website.",
  sections: [
    {
      heading: "Use of the site",
      body: [
        "You may use this site for lawful purposes to learn about Vigil.AI and its products. You may not attempt to disrupt or gain unauthorized access to the site.",
      ],
    },
    {
      heading: "Information on this site",
      body: [
        "Content is provided for general information. Product screens shown on this site are illustrative mock-ups with sample data.",
        "Savings figures are target ranges that are validated against each plant's measured baseline during the baseline phase. They are not guarantees of results.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The Vigil.AI name, logo, text, graphics and software on this site are owned by Vigil.AI or its licensors and may not be used without permission.",
      ],
    },
    {
      heading: "Links",
      body: ["Links to third-party sites are provided for convenience. We are not responsible for their content."],
    },
    {
      heading: "Limitation of liability",
      body: ["To the extent permitted by law, Vigil.AI is not liable for any loss arising from use of this website."],
    },
    {
      heading: "Changes",
      body: ["We may update these terms from time to time. The date at the top shows when they were last changed."],
    },
  ],
};
