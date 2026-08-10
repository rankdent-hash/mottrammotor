export default function RegPlate({
  value,
  className = "",
}: {
  value?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded bg-[#f7c600] px-2.5 py-1 font-mono font-bold tracking-wider text-navy-950 border-2 border-navy-950 ${className}`}
    >
      {value || "AB12 CDE"}
    </span>
  );
}
