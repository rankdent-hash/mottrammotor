import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCallBar from "@/components/layout/MobileCallBar";
import { practice } from "@/lib/practice";
import { siteUrl } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Private Dentist Tunbridge Wells | ${practice.name}`,
    template: `%s`,
  },
  description:
    "Private dentist in Royal Tunbridge Wells, opposite the station. General, cosmetic and implant dentistry with Dr Simon Azimi. Call 01892 547286.",
  openGraph: {
    siteName: practice.name,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
