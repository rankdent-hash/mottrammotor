export default function PlateBadge({
  plate,
  size = "md",
}: {
  plate: string;
  size?: "md" | "lg";
}) {
  return (
    <span
      className={`inline-block shrink-0 rounded-md border-2 border-slate-900 bg-[#f5cb00] font-black tracking-wide text-slate-900 whitespace-nowrap ${
        size === "lg" ? "px-4 py-2.5 text-2xl" : "px-3 py-2 text-lg"
      }`}
    >
      {plate}
    </span>
  );
}
