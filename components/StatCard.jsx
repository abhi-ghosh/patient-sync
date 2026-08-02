export default function StatCard({ current, total, label }) {
  const defaultStyle = "flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card py-6 shadow-sm"
  let currentStyle = null;
  if (current === 0) {
    currentStyle = defaultStyle;
  }else if (current < total) {
    currentStyle = `${defaultStyle} bg-red-50 border-red-500 dark:bg-card`;
  }else if (current === total) {
    currentStyle = `${defaultStyle} bg-green-50 border-green-500 dark:bg-card`;
  }
  return (
    <div className={currentStyle}>
      <p className="text-4xl font-bold text-foreground">
        {total !== undefined ? `${current}/${total}` : current}
      </p>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
}