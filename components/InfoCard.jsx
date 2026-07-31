export default function InfoCard({ label, value, required = false }) {
  return (
    <div
      className="flex flex-col gap-2 rounded-lg border border-dashed border-border
      bg-card p-4 min-h-24"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </p>
      <p className="font-mono text-lg text-foreground">
        {value || "—"}
      </p>
    </div>
  );
}