import TypeAnimation from "@/components/TypeAnimation";
import {CircleAlert, CircleCheck} from "lucide-react";
export default function InfoCard({ label, value, active = false, inputError= false, required = false, className = "", success = false }) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border ${className}
      ${
        success
          ? "bg-green-100 dark:bg-green-950/30 border-green-500"
          : inputError
          ? "bg-red-100 dark:bg-red-950/30 border-red-500"
          : "bg-card"
      }
      ${active ? "border-accent" : "border-border"
      } p-4 h-auto`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </p>
        {active && <TypeAnimation />}
        {inputError && <CircleAlert className="w-4 h-4 text-red-500" />}
        {success && <CircleCheck className="w-4 h-4 text-green-500" />}
      </div>
      <p className="font-mono text-md text-foreground">
        {value || "---"}
      </p>
      {<p className="text-xs text-red-500">This field is required</p>}
      {<p className="text-xs text-red-500">{"Error Message"}</p>}
    </div>
  );
}