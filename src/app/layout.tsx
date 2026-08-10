import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { business, siteUrl } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | MOT Testing, Servicing & Repairs in Manchester`,
    template: `%s | ${business.name}`,
  },
  description:
    "Mottram Motor Garage offers MOT testing, car servicing, repairs and tyre fitting in Manchester. Book online or call 0161 566 1319.",
  openGraph: {
    title: `${business.name} | MOT Testing, Servicing & Repairs in Manchester`,
    description:
      "MOT testing, car servicing, repairs and tyre fitting in Manchester. Book online or call 0161 566 1319.",
    url: siteUrl,
    siteName: business.name,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Public-site chrome (Header/Footer/mobile CTA bar) now lives in
  // src/app/(marketing)/layout.tsx so the /admin staff panel can render
  // full-screen with none of it. This root layout only sets up the <html>/
  // <body> shell and site-wide JSON-LD.
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
