import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-navy-900">Page not found</h1>
      <p className="mt-3 text-navy-600">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-amber-500 px-6 py-3 font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
      >
        Back to homepage
      </Link>
    </div>
  );
}
