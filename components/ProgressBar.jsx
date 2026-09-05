export default function ProgressBar({completionPct})
  {
    return (
        <div className="h-3 rounded-full bg-muted">
          <div className="h-full rounded-full bg-accent"
            style={{ width: `${completionPct}%`, transition: "width 0.2s ease" }}
        />
        </div>
    )
}