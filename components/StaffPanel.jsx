import InfoCard from "@/components/InfoCard";
import {User, Activity, Phone, Globe, Heart} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import TypeAnimation from "@/components/TypeAnimation";
import StatCard from "@/components/StatCard";
import { useState } from "react";
export default function StaffPanel() {
  const active = false;
  const inactive = !false;
  const inputError = false;
  const success = false;
  const infoGroupStyle = "grid grid-cols-1 md:grid-cols-2 gap-4";
  const sectionStyle = "flex flex-col gap-6";
  return (
    <div className="flex flex-col gap-6">
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
          <div className={`w-3 h-3 rounded-full ${active ? "bg-green-500" :"bg-muted"}`}></div>
          <p className="text-sm text-muted-foreground font-bold">{active ? "ACTIVE" : "OFFLINE"}</p>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className={`z-10 sticky top-5 lg:top-[-32]
      ${active ?  "bg-green-50 border-green-500" : inactive ? "bg-amber-50 border-amber-500" : "bg-card border-border"}
        flex flex-col gap-4 rounded-lg dark:bg-card border p-4 shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${active ? "bg-green-500" : inactive ? "bg-amber-500" :  "bg-muted"}`}></div>
            <div>
              <span className={`text-md font-bold ${active ? "text-green-500" : inactive ? "text-amber-500" : "text-muted-foreground"}`}>
                {active ? "Active" : inactive ? "Inactive" : "Not Started"}
              </span>
              <p className="text-sm text-muted-foreground">
                {active ? "Patient is currently filling out the form" : inactive ? "Patient is away" : "Waiting for patient to begin"}
              </p>
            </div>
          </div>
          <span className="flex flex-col items-center text-lg text-foreground font-bold">
            {0}%
            <p className="text-sm">Complete</p>
          </span>
        </div>
        {/* Progress Bar */}
        <div className="h-3 rounded-full bg-muted">
          <div className="h-full w-0 rounded-full bg-accent" />
        </div>
        <p className="text-xs text-muted-foreground">Last activity: just now</p>
      </div>
      {/* Currently Entering Field */}
      <div className="flex items-center gap-2 text-sm text-accent">
        <Activity className="w-4 h-4"/>
        <p>Entering: <span className="font-bold">{"Last Name"}</span></p>
        <TypeAnimation/>
      </div>
      {/* Info Cards */}
      {/* Personal Information */}
      <section className={sectionStyle}>
        <SectionHeader icon={User} title="Personal Information" />
        <div className={infoGroupStyle}>
          <InfoCard label="First Name" value="John" active={active} inputError={inputError} success={success} required/>
          <InfoCard label="Middle Name" value="" active={active} inputError={inputError} success={success}/>
          <InfoCard label="Last Name" value="Doe" active={active} inputError={inputError} success={success} required/>
          <InfoCard label="Date of Birth" value="01/01/1990" active={active} inputError={inputError} success={success} required/>
          <InfoCard label="Gender" value="Male" active={active} inputError={inputError} success={success} required/>
        </div>
      </section>
      {/* Contact Information */}
      <section className={sectionStyle}>
        <SectionHeader icon={Phone} title="Contact Information" />
        <div className={infoGroupStyle}>
          <InfoCard label="Phone Number" value="" active={active} inputError={inputError} success={success} required/>
          <InfoCard label="Email Address" value="john.doe@example.com" active={active} inputError={inputError} success={success}/>
          <InfoCard className="md:col-span-2" label="Address" value="" active={active} inputError={inputError} success={success} required/>
        </div>
      </section>
      {/* Additional Information */}
      <section className={sectionStyle}>
        <SectionHeader icon={Globe} title="Additional Information" />
        <div className={infoGroupStyle}>
          <InfoCard label="Preferred Language" value="Thai" active={active} inputError={inputError} success={success} required/>
          <InfoCard label="Nationality" value="Thai" active={active} inputError={inputError} success={success} required/>
          <InfoCard label="Religion" value="" active={active} inputError={inputError} success={success}/>
        </div>
      </section>
      {/* Emergency Contact */}
      <section className={sectionStyle}>
        <SectionHeader icon={Heart} title="Emergency Contact" />
        <div className={infoGroupStyle}>
          <InfoCard label="Emergency Contact Number" value="" active={active} className={"md:col-span-2"} inputError={inputError} success={success} required/>
          <InfoCard label="Emergency Contact Name" value="" active={active} inputError={inputError} success={success}/>
          <InfoCard label="Emergency Contact Relationship" value="" active={active} inputError={inputError} success={success}/>
        </div>
      </section>
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          current={0}
          total={8}
          label="Required fields"
        />
        <StatCard
          current={0}
          label="Validation errors"
        />
        <StatCard
          current={0}
          total={6}
          label="Optional fields"
        />
      </div>
    </div>
  )
}