export default function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 border-b border-border pb-4">
      <Icon className="w-4 h-4 text-accent" />
      <h2 className="text-lg font-bold text-foreground">
        {title}
      </h2>
    </div>
  );
}