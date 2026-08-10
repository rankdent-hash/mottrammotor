import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Admin",
  robots: { index: false, follow: false },
};

// Full-screen layout for the staff panel — deliberately no public Header/
// Footer/mobile CTA bar (those live in src/app/(marketing)/layout.tsx).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-slate-100">{children}</div>;
}
