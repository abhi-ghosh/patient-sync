export default function StatCard({ current, total, id, label, notStarted}) {
  const defaultStyle = "flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card py-6 shadow-sm";
  const errorStyle = "bg-red-50 border-red-500 dark:bg-card";
  const successStyle = "bg-green-50 border-green-500 dark:bg-card";
  let currentStyle = defaultStyle;

  //* Styles for the stat card
  if (notStarted) {
    currentStyle = defaultStyle;
  } else if (id === "errors") {
      currentStyle =
        current === 0
          ? `${defaultStyle} ${successStyle}`
          : `${defaultStyle} ${errorStyle}`;
  } else if (id === "required") {
    current === total ?
      currentStyle = `${defaultStyle} ${successStyle}` :
      currentStyle = `${defaultStyle} ${errorStyle}`;
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