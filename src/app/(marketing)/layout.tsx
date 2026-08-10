import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import PlaceholderBanner from "@/components/PlaceholderBanner";

// Chrome (header/footer/mobile bar/placeholder banner) for every public
// marketing page. Deliberately NOT applied to /admin — the staff panel has
// its own full-screen layout with no public nav.
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PlaceholderBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileCTA />
    </>
  );
}
