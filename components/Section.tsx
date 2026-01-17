export default function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-6 py-20 max-w-6xl mx-auto ${className}`}>
      {children}
    </section>
  );
}
