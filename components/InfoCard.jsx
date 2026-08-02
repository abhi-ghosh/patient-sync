import TypeAnimation from "@/components/TypeAnimation";
import {CircleAlert, CircleCheck} from "lucide-react";
export default function InfoCard({ label, value, focused, required, className = "", inputError, success = false, errorMessage}) {
  return (
    <div
      className={`flex flex-col gap-2 max-h-30 overflow-y-auto rounded-lg border ${className} wrap-break-word
      ${
        success
          ? "bg-green-100 dark:bg-card border-green-500"
          : inputError
          ? "bg-red-100 dark:bg-card border-red-500"
          : "bg-card"
      }
      ${focused ? "border-accent" : "border-border"
      } p-4 h-auto`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </p>
        <div className="flex items-center gap-2">
          {focused && <TypeAnimation />}
          {inputError && <CircleAlert className="w-4 h-4 text-red-500" />}
          {success && <CircleCheck className="w-4 h-4 text-green-500" />}
        </div>

      </div>
      <p className="font-mono text-md text-foreground">
        {value || "---"}
      </p>
      {inputError && (
      <p className="text-xs text-red-500">
        {errorMessage}
      </p>
      )}
    </div>
  );
}