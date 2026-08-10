export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-page py-12 sm:py-16">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-navy-100">{intro}</p>}
      </div>
    </section>
  );
}
