import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LegalDocument, type LegalSection } from "@/components/legal-content";

const SECTIONS: LegalSection[] = [
  {
    heading: "1. Who Can Use Subbed",
    blocks: [
      {
        type: "p",
        text: "You must be at least 18 years old to use Subbed. By using the Platform, you represent and warrant that you are at least 18 years of age, have the legal capacity to enter into a binding agreement, and will comply with these Terms and all applicable laws.",
      },
      { type: "p", text: "Subbed is available to two types of users:" },
      {
        type: "ul",
        items: [
          "Studio Owners — individuals or entities that own or manage a fitness or wellness studio",
          "Instructors — certified fitness and wellness instructors seeking substitute or long-term teaching opportunities",
        ],
      },
    ],
  },
  {
    heading: "2. Your Account",
    blocks: [
      {
        type: "p",
        text: "To use most features of Subbed, you must create an account. You agree to provide accurate, current, and complete information when registering. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
      },
      {
        type: "p",
        text: "You must notify us immediately at hello@getsubbed.co if you believe your account has been compromised. Subbed is not liable for any losses resulting from unauthorized use of your account.",
      },
    ],
  },
  {
    heading: "3. What Subbed Does and Does Not Do",
    blocks: [
      {
        type: "p",
        text: "Subbed is a marketplace platform that connects studio owners with fitness and wellness instructors. Subbed does not:",
      },
      {
        type: "ul",
        items: [
          "Employ any instructors listed on the Platform",
          "Guarantee the quality, safety, or suitability of any instructor or studio",
          "Control the terms of any arrangement between studios and instructors",
          "Verify or guarantee the accuracy of certifications or credentials listed by users",
        ],
      },
      {
        type: "p",
        text: "Any arrangement made between a studio and an instructor through Subbed is solely between those two parties. Subbed is not a party to any such agreement and bears no responsibility for its outcome.",
      },
    ],
  },
  {
    heading: "4. User Conduct",
    blocks: [
      { type: "p", text: "By using Subbed, you agree not to:" },
      {
        type: "ul",
        items: [
          "Post false, misleading, or fraudulent information on your profile or listings",
          "Harass, threaten, or discriminate against other users",
          "Use the Platform for any unlawful purpose",
          "Attempt to circumvent the Platform by taking relationships off-platform to avoid future fees",
          "Scrape, copy, or systematically extract data from the Platform",
          "Impersonate another person or misrepresent your qualifications or credentials",
        ],
      },
      {
        type: "p",
        text: "Subbed reserves the right to suspend or terminate any account that violates these Terms or that we determine, in our sole discretion, is harmful to the Platform or its users.",
      },
    ],
  },
  {
    heading: "5. Fees and Payment",
    blocks: [
      {
        type: "p",
        text: "Subbed currently offers free access to the Platform during its launch period. We reserve the right to introduce paid tiers, subscription fees, or transaction fees at any time. We will provide reasonable notice of any changes to our fee structure before they take effect.",
      },
      {
        type: "p",
        text: "If and when paid features are introduced, all payments will be processed through a secure third-party payment processor. Subbed does not store full credit card information.",
      },
    ],
  },
  {
    heading: "6. Intellectual Property",
    blocks: [
      {
        type: "p",
        text: 'All content on the Subbed Platform — including but not limited to the name "Subbed," our logo, design, text, and software — is owned by Subbed LLC or its licensors and is protected by applicable intellectual property laws.',
      },
      {
        type: "p",
        text: "You retain ownership of the content you post on Subbed (such as your profile, bio, and photos). By posting content on the Platform, you grant Subbed a non-exclusive, royalty-free, worldwide license to display, reproduce, and distribute that content solely for the purpose of operating and promoting the Platform.",
      },
    ],
  },
  {
    heading: "7. Disclaimers",
    blocks: [
      {
        type: "p",
        emphasis: true,
        text: 'THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. SUBBED DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.',
      },
      {
        type: "p",
        text: "Subbed makes no representations or warranties regarding the quality, suitability, reliability, or availability of any instructor or studio listed on the Platform.",
      },
    ],
  },
  {
    heading: "8. Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "To the fullest extent permitted by law, Subbed LLC and its founders, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform, even if we have been advised of the possibility of such damages.",
      },
      {
        type: "p",
        text: "Our total liability to you for any claim arising out of or relating to these Terms or the Platform shall not exceed the greater of (a) the amount you paid us in the twelve months preceding the claim, or (b) one hundred dollars ($100).",
      },
    ],
  },
  {
    heading: "9. Indemnification",
    blocks: [
      {
        type: "p",
        text: "You agree to indemnify, defend, and hold harmless Subbed LLC and its officers, directors, founders, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your access to or use of the Platform, your violation of these Terms, or your violation of any rights of another user.",
      },
    ],
  },
  {
    heading: "10. Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by the laws of the State of California, without regard to its conflict of law principles. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in Orange County, California.",
      },
    ],
  },
  {
    heading: "11. Changes to These Terms",
    blocks: [
      {
        type: "p",
        text: 'We may update these Terms from time to time. When we do, we will update the "Last Updated" date at the top of this page and, where appropriate, notify you by email. Your continued use of the Platform after any changes constitutes your acceptance of the updated Terms.',
      },
    ],
  },
  {
    heading: "12. Contact Us",
    blocks: [
      {
        type: "p",
        text: "If you have any questions about these Terms, please contact us at:",
      },
      {
        type: "address",
        lines: ["Subbed LLC", "Email: hello@getsubbed.co", "Website: app.getsubbed.co"],
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <LegalDocument
        title="Terms of Service"
        effectiveDate="July 2, 2026"
        lastUpdated="July 2, 2026"
        intro={[
          {
            type: "p",
            text: 'Welcome to Subbed. By accessing or using the Subbed platform at app.getsubbed.co (the "Platform"), you agree to be bound by these Terms of Service ("Terms"). Please read them carefully before using the Platform.',
          },
          {
            type: "p",
            text: 'Subbed is operated by Subbed LLC, a California limited liability company ("Subbed," "we," "us," or "our"). If you do not agree to these Terms, please do not use the Platform.',
          },
        ]}
        sections={SECTIONS}
      />
      <Footer />
    </div>
  );
}
