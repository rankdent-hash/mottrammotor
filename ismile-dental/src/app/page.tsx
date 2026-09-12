import type { Metadata } from "next";
import PageRenderer from "@/components/PageRenderer";
import { home } from "@/lib/content/home";

export const metadata: Metadata = {
  title: home.metaTitle,
  description: home.metaDescription,
  alternates: { canonical: "/" },
  openGraph: { title: home.metaTitle, description: home.metaDescription, url: "/" },
};

export default function HomePage() {
  return <PageRenderer page={home} />;
}
