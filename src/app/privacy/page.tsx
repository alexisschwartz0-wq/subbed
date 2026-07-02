import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LegalDocument, type LegalSection } from "@/components/legal-content";

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We collect the following types of information when you use Subbed:",
      },
      { type: "subheading", text: "Information you provide directly:" },
      {
        type: "ul",
        items: [
          "Name, email address, and password when you create an account",
          "Profile information including bio, photo, location, certifications, disciplines, and availability (for instructors)",
          "Studio name, address, description, phone number, and website (for studio owners)",
          "Messages you send to other users through our in-app messaging system",
          "Any other information you choose to provide",
        ],
      },
      { type: "subheading", text: "Information we collect automatically:" },
      {
        type: "ul",
        items: [
          "Device type, browser type, and operating system",
          "IP address and approximate location",
          "Pages visited, features used, and time spent on the Platform",
          "Cookies and similar tracking technologies (see Section 5)",
        ],
      },
    ],
  },
  {
    heading: "2. How We Use Your Information",
    blocks: [
      { type: "p", text: "We use the information we collect to:" },
      {
        type: "ul",
        items: [
          "Create and manage your account",
          "Enable connections between studios and instructors",
          "Display your profile to other users of the Platform",
          "Send you transactional emails such as account confirmation and password reset",
          "Notify you of relevant activity such as messages or new listings near you",
          "Improve the Platform and develop new features",
          "Ensure the safety and integrity of the Platform",
          "Comply with legal obligations",
        ],
      },
      {
        type: "p",
        text: "We will not sell your personal information to third parties. We do not use your information for third-party advertising.",
      },
    ],
  },
  {
    heading: "3. How We Share Your Information",
    blocks: [
      {
        type: "p",
        text: "We share your information only in the following circumstances:",
      },
      {
        type: "ul",
        items: [
          "With other users — your profile information (name, photo, bio, disciplines, location, and availability) is visible to other registered users of the Platform as part of the core functionality of Subbed",
          "With service providers — we share information with trusted third-party service providers who help us operate the Platform, including Supabase (database and authentication), Vercel (hosting), and payment processors. These providers are contractually required to protect your information",
          "For legal reasons — we may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect the rights, safety, or property of Subbed or others",
          "In a business transfer — if Subbed is acquired or merges with another company, your information may be transferred as part of that transaction. We will notify you before your information is subject to a different privacy policy",
        ],
      },
    ],
  },
  {
    heading: "4. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain your personal information for as long as your account is active or as needed to provide you with the Platform. If you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal or compliance reasons.",
      },
    ],
  },
  {
    heading: "5. Cookies",
    blocks: [
      {
        type: "p",
        text: "Subbed uses cookies and similar technologies to keep you logged in, remember your preferences, and understand how you use the Platform. You can control cookies through your browser settings, but disabling certain cookies may affect the functionality of the Platform.",
      },
    ],
  },
  {
    heading: "6. Data Security",
    blocks: [
      {
        type: "p",
        text: "We implement industry-standard security measures to protect your personal information, including encryption of data in transit (SSL/TLS) and at rest, secure authentication via Supabase, and regular security reviews. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    heading: "7. Your Rights and Choices",
    blocks: [
      {
        type: "p",
        text: "Depending on your location, you may have the following rights regarding your personal information:",
      },
      {
        type: "ul",
        items: [
          "Access — you can request a copy of the personal information we hold about you",
          "Correction — you can update or correct your information at any time through your account settings",
          "Deletion — you can request that we delete your personal information by contacting us at hello@getsubbed.co",
          "Opt-out of emails — you can unsubscribe from non-transactional emails at any time using the unsubscribe link in any email we send",
        ],
      },
      {
        type: "p",
        text: "To exercise any of these rights, please contact us at hello@getsubbed.co. We will respond to your request within 30 days.",
      },
    ],
  },
  {
    heading: "8. Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "Subbed is not intended for users under the age of 18. We do not knowingly collect personal information from anyone under 18. If we become aware that we have collected information from a child under 18, we will delete it promptly.",
      },
    ],
  },
  {
    heading: "9. California Privacy Rights",
    blocks: [
      {
        type: "p",
        text: "If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete your personal information, and the right to opt out of the sale of your personal information. We do not sell personal information. To exercise your California privacy rights, contact us at hello@getsubbed.co.",
      },
    ],
  },
  {
    heading: "10. Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: 'We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page. For significant changes, we will notify you by email. Your continued use of the Platform after any changes constitutes your acceptance of the updated Privacy Policy.',
      },
    ],
  },
  {
    heading: "11. Contact Us",
    blocks: [
      {
        type: "p",
        text: "If you have any questions about this Privacy Policy or how we handle your information, please contact us at:",
      },
      {
        type: "address",
        lines: ["Subbed LLC", "Email: hello@getsubbed.co", "Website: app.getsubbed.co"],
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <LegalDocument
        title="Privacy Policy"
        effectiveDate="July 2, 2026"
        lastUpdated="July 2, 2026"
        intro={[
          {
            type: "p",
            text: 'At Subbed, we take your privacy seriously. This Privacy Policy explains how Subbed LLC ("Subbed," "we," "us," or "our") collects, uses, shares, and protects the personal information of users of our platform at app.getsubbed.co (the "Platform").',
          },
          {
            type: "p",
            text: "By using the Platform, you agree to the collection and use of your information as described in this Privacy Policy.",
          },
        ]}
        sections={SECTIONS}
      />
      <Footer />
    </div>
  );
}
