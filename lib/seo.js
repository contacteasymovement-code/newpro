export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.easymovement.in";

export const SITE_NAME = "Easy Movement";

export const SITE_DESCRIPTION =
  "Easy Movement delivers certified home physiotherapy across India. BPT/MPT therapists, 24×7 booking, free consultation. Knee pain, stroke rehab, post-surgery recovery & more.";

export const PHONE = "+917808770072";
export const PHONE_DISPLAY = "+91 78087 70072";

export const ADDRESS = {
  streetAddress: "3rd Floor, Folk, Whitefield",
  addressLocality: "Bangalore",
  addressRegion: "Karnataka",
  postalCode: "560066",
  addressCountry: "IN",
};

export const FAQ_ITEMS = [
  [
    "Is home physiotherapy as effective as clinic physiotherapy?",
    "Yes — in many cases, home physiotherapy is MORE effective. Research shows patients recover faster in familiar home environments. You get 100% focused one-on-one attention with zero waiting time.",
  ],
  [
    "How qualified are your physiotherapists?",
    "All our therapists hold a minimum BPT (Bachelor of Physiotherapy) degree, with many holding MPT (Masters) as well. Each has minimum 2 years of clinical experience, is police-verified, and undergoes regular training updates.",
  ],
  [
    "Are you really available 24×7?",
    "Yes! Easy Movement operates 24 hours a day, 7 days a week, 365 days a year. You can reach us by phone or WhatsApp any time. Session scheduling depends on therapist availability in your area, but we always have someone on call.",
  ],
  [
    "What if I'm not happy with my therapist?",
    "Simply call us or WhatsApp, and we'll assign a different therapist within 24 hours — no questions asked. We also offer a full refund if you're not satisfied after the first session.",
  ],
  [
    "Do you serve my city?",
    "Easy Movement is a pan-India service. We cover all major cities and towns across India. If you're in a smaller town or village, call us and we'll do our best to assign a therapist near you.",
  ],
  [
    "Do you work with my existing doctor's prescription?",
    "Absolutely. Share your existing prescription and our therapist will align the home therapy plan with your doctor's recommendations. We can also send weekly updates directly to your doctor.",
  ],
];

export function getOrganizationJsonLd() {
  return {
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/easymovementlogo.jpg`,
    image: `${SITE_URL}/easy_movement_heroimage_home_physiotherapy_female.jpg`,
    description: SITE_DESCRIPTION,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      ...ADDRESS,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [`https://wa.me/${PHONE.replace("+", "")}`],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

export function getFaqJsonLd() {
  return {
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function getJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationJsonLd(),
      getWebsiteJsonLd(),
      getFaqJsonLd(),
    ],
  };
}
