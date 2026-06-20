import HomePageClient from "@/components/HomePageClient";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: `${SITE_NAME} | Home Physiotherapy Across India`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
