import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import PlaceholderBanner from "@/components/PlaceholderBanner";
import JsonLd from "@/components/JsonLd";
import { business, siteUrl } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | NHS & Private Dentist`,
    template: `%s | ${business.name}`,
  },
  description:
    "NHS and private dental care for the whole family — routine check-ups, hygiene, emergency appointments, implants, whitening and clear aligners. Request an appointment online.",
  openGraph: {
    title: `${business.name} | NHS & Private Dentist`,
    description:
      "NHS and private dental care for the whole family. Request an appointment online.",
    url: siteUrl,
    siteName: business.name,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <PlaceholderBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
