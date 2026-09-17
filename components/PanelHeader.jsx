export default function PanelHeader({icon, title, tag, children}){
  const Icon = icon;
  return (
      <div className="flex items-center justify-between">
        <div className="text-foreground flex gap-1 flex-col">
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <div className="bg-secondary p-2 rounded-lg items-center justify-center border border-accent">
              <Icon className="text-accent w-4 h-4" />
            </div>
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{tag}</p>
        </div>
        {children}
      </div>
  )
}