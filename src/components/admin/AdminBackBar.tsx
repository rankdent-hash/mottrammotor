import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminBackBar({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <div className="bg-navy-900 text-white">
      <div className="mx-auto max-w-3xl px-5 py-4 flex items-center gap-3">
        <Link
          href={href}
          aria-label="Back"
          className="p-1.5 -ml-1.5 rounded-lg hover:bg-navy-800"
        >
          <ArrowLeft className="h-6 w-6" aria-hidden="true" />
        </Link>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
