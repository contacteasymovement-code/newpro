import { DM_Sans, Playfair_Display } from "next/font/google";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  getJsonLdGraph,
} from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Home Physiotherapy Across India`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Easy Movement",
    "Easy Movement physiotherapy",
    "home physiotherapy",
    "physiotherapy at home India",
    "home physiotherapist",
    "physiotherapy Bangalore",
    "stroke rehabilitation at home",
    "post surgery physiotherapy",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Expert Home Physiotherapy`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/easy_movement_heroimage_home_physiotherapy_female.jpg",
        width: 1200,
        height: 630,
        alt: "Easy Movement home physiotherapy session in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Home Physiotherapy India`,
    description: SITE_DESCRIPTION,
    images: ["/easy_movement_heroimage_home_physiotherapy_female.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/easymovementlogo.jpg",
    apple: "/easymovementlogo.jpg",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default function RootLayout({ children }) {
  const jsonLd = getJsonLdGraph();

  return (
    <html
      lang="en-IN"
      className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
