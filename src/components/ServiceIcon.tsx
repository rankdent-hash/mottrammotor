import {
  Disc3,
  Cog,
  Wind,
  BatteryCharging,
  ScanSearch,
  Snowflake,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { ServiceSummary } from "@/lib/site-data";

const iconMap: Record<ServiceSummary["icon"], LucideIcon> = {
  brake: Disc3,
  clutch: Cog,
  exhaust: Wind,
  battery: BatteryCharging,
  diagnostics: ScanSearch,
  ac: Snowflake,
  suspension: Waves,
};

export default function ServiceIcon({
  icon,
  className,
}: {
  icon: ServiceSummary["icon"];
  className?: string;
}) {
  const Icon = iconMap[icon];
  return <Icon className={className} aria-hidden="true" />;
}
