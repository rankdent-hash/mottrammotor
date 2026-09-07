import { ShieldCheck, HeartPulse, Users, Accessibility } from "lucide-react";

const points = [
  { icon: ShieldCheck, label: "GDC-registered clinicians" },
  { icon: HeartPulse, label: "CQC registered & inspected" },
  { icon: Users, label: "NHS & private patients" },
  { icon: Accessibility, label: "Step-free ground floor access" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-brand-100 bg-brand-50">
      <div className="container-page grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
        {points.map((p) => (
          <div key={p.label} className="flex items-center gap-2.5 text-sm text-brand-800">
            <p.icon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
            <span className="font-medium">{p.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
