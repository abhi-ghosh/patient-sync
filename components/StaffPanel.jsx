import InfoCard from "@/components/InfoCard";
import {User} from "lucide-react";
import { useState } from "react";
export default function StaffPanel() {
  const active = false;
  return (
    <div className="px-4 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-foreground flex gap-1 flex-col">
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <div className="bg-secondary p-2 rounded-lg items-center justify-center border border-accent">
              <User className="text-accent w-4 h-4" />
            </div>
            Staff Monitor
          </h1>
          <p className="text-sm text-muted-foreground">Real-time patient form activity</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${active ? "bg-green-500" : "bg-muted"}`}></div>
          <p className="text-sm text-muted-foreground font-bold">{active ? "ACTIVE" : "OFFLINE"}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="sticky top-5 bg-card flex flex-col gap-4 rounded-lg border border-border p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${active ? "bg-green-500" : "bg-muted"}`}></div>
            <div>
              <span className="text-md font-bold text-muted-foreground">
                Not Started
              </span>
              <p className="text-sm text-muted-foreground">
                Waiting for patient to begin
              </p>
            </div>
          </div>
          <span className="flex flex-col items-center text-lg text-foreground font-bold">
            {0}%
            <p className="text-sm">Complete</p>
          </span>
        </div>
        {/* Progress Bar - Only shows up when user is active */}
        {active && (
        <div className="h-3 rounded-full bg-muted">
          <div className="h-full w-0 rounded-full bg-accent" />
        </div>
        )}
      </div>
    </div>
  )
}