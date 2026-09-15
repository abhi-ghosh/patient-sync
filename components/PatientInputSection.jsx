import SectionHeader from "@/components/SectionHeader";
export default function PatientInputSection({children, icon, title}) {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeader icon={icon} title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </section>
  );
}