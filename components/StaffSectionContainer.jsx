import SectionHeader from "@/components/SectionHeader";
import InfoCard from "@/components/InfoCard";
export default function StaffSectionContainer({icon, title, fields, getInfoCardProps}) {
  return (
    <section className="flex flex-col gap-6">
        <SectionHeader icon={icon} title={title} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <InfoCard
              key={field.key}
              name = {field.key}
              {...getInfoCardProps(field)}
            />
          ))}
        </div>
    </section>
  );
}