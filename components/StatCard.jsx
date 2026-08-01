export default function StatCard({ current, total, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card py-6 shadow-sm">
      <p className="text-4xl font-bold text-foreground">
        {total !== undefined ? `${current}/${total}` : current}
      </p>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
}