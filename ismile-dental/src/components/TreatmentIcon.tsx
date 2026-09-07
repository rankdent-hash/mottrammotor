import {
  Smile,
  Layers,
  Gem,
  HeartPulse,
  Stethoscope,
  Sparkles,
  ScanFace,
  Star,
  Baby,
  ShieldCheck,
} from "lucide-react";
import type { TreatmentIconName } from "@/lib/site-data";

// One lucide icon per treatment, kept in a single map so pages can pass the
// icon name through from site-data (a plain string) without importing a
// component reference into what is otherwise pure content.
const icons: Record<TreatmentIconName, typeof Smile> = {
  checkup: Stethoscope,
  filling: Layers,
  crown: Gem,
  rootcanal: HeartPulse,
  implant: ShieldCheck,
  whitening: Sparkles,
  aligners: ScanFace,
  veneers: Star,
  dentures: Smile,
  children: Baby,
};

export default function TreatmentIcon({
  icon,
  className,
}: {
  icon: TreatmentIconName;
  className?: string;
}) {
  const Icon = icons[icon];
  return <Icon className={className} aria-hidden="true" />;
}
