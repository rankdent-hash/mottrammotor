import type { MotStatus } from "@/lib/admin-mock-data";

const toneClasses: Record<MotStatus, string> = {
  ok: "bg-green-100 text-green-700",
  "due-soon": "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
};

export default function StatusPill({
  tone,
  children,
}: {
  tone: MotStatus;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`text-sm font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
