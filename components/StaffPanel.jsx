"use client";
import { useState, useEffect} from "react";
import InfoCard from "@/components/InfoCard";
import {personalFields, contactFields, additionalFields, emergencyFields, requiredFields, allFields} from "@/components/Data";
import {User, Activity, Phone, Globe, Heart} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import TypeAnimation from "@/components/TypeAnimation";
import StatCard from "@/components/StatCard";
export default function StaffPanel({staffPanelData}) {

  // Current timestamp
  const [now, setNow] = useState(() => Date.now());
  // Refresh the current time every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  //Calculate patient inactivity
  const secondsAgo = staffPanelData.lastActivity
    ? Math.floor((now - staffPanelData.lastActivity) / 1000)
    : 0;
  //secondsAgo rounded to the nearest 5 so it displays in 5s increments
  const roundedSeconds = Math.floor(secondsAgo / 5) * 5;
  //Inactivity message
  let activityMessage= "";
  if (secondsAgo < 5) {
    activityMessage = "Just now";
  } else if (secondsAgo < 30) {
    activityMessage = `${roundedSeconds} seconds ago`;
  } else {
    activityMessage = "30+ seconds ago";
  }

  //Default state when no activity
  const notStarted = staffPanelData.lastActivity === null;
  //Active state when onFocus triggers
  const active =
    !notStarted &&
    secondsAgo < 30;
  //Inactive state when no activity for 30 seconds
  const inactive =
    !notStarted &&
    secondsAgo >= 30;

  //Which field is active & it's data
  const activeField = allFields.find(
    field => field.key === staffPanelData.activeField
  );

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
            {staffPanelData.completionPct}%
            <p className="text-sm">Complete</p>
          </span>
        </div>
        {/* Progress Bar */}
        <div className="h-3 rounded-full bg-muted">
          <div className={`h-full rounded-full bg-accent`} style={{ width: `${staffPanelData.completionPct}%`, transition: "width 0.2s ease" }} />
        </div>
        {(active || inactive) && (<p className="text-xs text-muted-foreground">{`Last Activity: ${activityMessage}`}</p>)}
        {/* Currently Entering Field */}
        {active && <div className={`flex items-center gap-2 text-sm text-accent ${activeField ? "" : "hidden"}`}>
          <Activity className="w-4 h-4"/>
          <p>Entering: <span className="font-bold">
            {activeField?.label}</span>
          </p>
          <TypeAnimation/>
        </div>}
      </div>
      {/* Info Cards */}
      {/* Personal Information */}
      <section className={sectionStyle}>
        <SectionHeader icon={User} title="Personal Information" />
        <div className={infoGroupStyle}>
          {personalFields.map((field, index) => (
            <InfoCard
              key={index}
              label={field.label}
              value={staffPanelData.formData[field.key]}
              required={requiredFields.includes(field.key)}
              focused={activeField?.key === field.key}
            />
          ))}
        </div>
      </section>
      {/* Contact Information */}
      <section className={sectionStyle}>
        <SectionHeader icon={Phone} title="Contact Information" />
        <div className={infoGroupStyle}>
          {contactFields.map((field, index) => (
            <InfoCard
              key={index}
              label={field.label}
              value={staffPanelData.formData[field.key]}
              required={requiredFields.includes(field.key)}
              focused={activeField?.key === field.key}
            />
          ))}
        </div>
      </section>
      {/* Additional Information */}
      <section className={sectionStyle}>
        <SectionHeader icon={Globe} title="Additional Information" />
        <div className={infoGroupStyle}>
          {additionalFields.map((field, index) => (
            <InfoCard
              key={index}
              label={field.label}
              value={staffPanelData.formData[field.key]}
              required={requiredFields.includes(field.key)}
              focused={activeField?.key === field.key}
            />
          ))}
          <InfoCard label="Religion" value={staffPanelData.formData.religion} active={active} inputError={inputError} success={success}/>
        </div>
      </section>
      {/* Emergency Contact */}
      <section className={sectionStyle}>
        <SectionHeader icon={Heart} title="Emergency Contact" />
        <div className={infoGroupStyle}>
          {emergencyFields.map((field, index) => (
            <InfoCard
              key={index}
              label={field.label}
              value={staffPanelData.formData[field.key]}
              required={requiredFields.includes(field.key)}
              focused={activeField?.key === field.key}
            />
          ))}
        </div>
      </section>
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          current={requiredFields.filter((field) => staffPanelData.formData[field]).length}
          total={requiredFields.length}
          label="Required fields"
        />
        <StatCard
          current={0}
          label="Validation errors"
        />
        <StatCard
         //Extract fields that are not in requiredFields and has a truthy value
          current={
            Object.keys(staffPanelData.formData)
              .filter(
                (field) =>
                  !requiredFields.includes(field) &&
                  staffPanelData.formData[field]
              ).length
            }
          total={Object.keys(staffPanelData.formData).length - requiredFields.length}
          label="Optional fields"
        />
      </div>
    </div>
  )
}