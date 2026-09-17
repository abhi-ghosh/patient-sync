"use client";
import { useState, useEffect} from "react";
import {personalFields, contactFields, additionalFields, emergencyFields, requiredFields, allFields} from "@/components/Data";
import {User, Activity, Phone, Globe, Heart} from "lucide-react";
import TypeAnimation from "@/components/TypeAnimation";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import StaffSectionContainer from "@/components/StaffSectionContainer";
export default function StaffPanel({staffPanelData}) {
  //* Statistics Array
  const stats = [
    {
      label: "Required fields",
      current: requiredFields.filter((field) =>
        staffPanelData.formData[field].trim() && !staffPanelData.errors[field]).length,
      total: requiredFields.length,
      id: "required"
    },
    {
      label: "Validation errors",
      current: Object.keys(staffPanelData.errors).length,
      id: "errors"
    },
    {
      label: "Optional fields",
      current: Object.keys(staffPanelData.formData)
              .filter(
                (field) =>
                  field !== "submitted" &&
                  !requiredFields.includes(field) &&
                  staffPanelData.formData[field]
              ).length,
      total: Object.keys(staffPanelData.formData)
              .filter((field) => field !== "submitted").length - requiredFields.length,
      id: "optional"
    }
  ];

  //* Reusable InfoCard Props
  const getInfoCardProps = (field) => ({
    label: field.label,
    value: staffPanelData.formData[field.key],
    required: requiredFields.includes(field.key),
    focused: activeField?.key === field.key,
    inputError: !!staffPanelData.errors[field.key],
    success:
      !!staffPanelData.formData[field.key] &&
      !staffPanelData.errors[field.key],
    errorMessage: staffPanelData.errors[field.key]
  });

  //* Current timestamp
  const [now, setNow] = useState(() => Date.now());

  //* Refresh the current time every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  //* Calculate patient inactivity
  const secondsAgo = staffPanelData.lastActivity
    ? Math.floor((now - staffPanelData.lastActivity) / 1000)
    : 0;

  //* secondsAgo rounded to the nearest 5 so it displays in 5s increments
  const roundedSeconds = Math.floor(secondsAgo / 5) * 5;

  //* Inactivity message
  let activityMessage= "";
  if (secondsAgo < 5) {
    activityMessage = "Just now";
  } else if (secondsAgo < 30) {
    activityMessage = `${roundedSeconds} seconds ago`;
  } else {
    activityMessage = "30+ seconds ago";
  }

  //* Default state when no activity
  const notStarted = staffPanelData.lastActivity === null;

  //* Active state when onFocus triggers
  const active = !notStarted && secondsAgo < 30;

  //* Inactive state when no activity for 30 seconds
  const inactive = !notStarted && secondsAgo >= 30;

  //* Submitted state
  const submitted = staffPanelData.submitted;

  //* Which field is active & it's data
  const activeField = allFields.find(
    field => field.key === staffPanelData.activeField
  );

  //* Section Array
  const sectionArr = [
        {
          title : "Personal Information",
          fields: personalFields,
          icon: User
        },
        {
          title : "Contact Information",
          fields: contactFields,
          icon: Phone
        },
        {
          title : "Additional Information",
          fields: additionalFields,
          icon: Globe
        },
        {
          title : "Emergency Contact",
          fields: emergencyFields,
          icon: Heart
        }
      ];

  return (
    <div className="flex flex-col gap-6">
      {/*//* Header */}
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

      {/* //* Progress Stats Container */}
      <div className={`z-10 sticky top-5 lg:-top-8
        ${submitted
          //* if sumitted
          ? "bg-blue-50 border-blue-300"
          : active
          //* if active
          ? "bg-green-50 border-green-500"
          : inactive
          //* if inactive
          ? "bg-amber-50 border-amber-500"
          //* if not started
          : "bg-card border-border"
        }
        flex flex-col gap-4 rounded-lg dark:bg-card border p-4 shadow-sm`}
      >

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">

            {/*//* Status indicator dot */}
            <div className={`w-3 h-3 rounded-full ${submitted ? "bg-accent" : active ?
              "bg-green-500" : inactive ? "bg-amber-500" :  "bg-muted"}`}
            >
            </div>

            {/*//* Status text */}
            <div>
              <span
                className={`text-md font-bold ${
                  submitted
                    //* if sumitted
                    ? "text-accent"
                    //* if active
                    : active
                    ? "text-green-500"
                    //* if inactive
                    : inactive
                    ? "text-amber-500"
                    //* if not started
                    : "text-muted-foreground"
                }`}
              >
                {submitted
                  //* if sumitted
                  ? "Submitted"
                  //* if active
                  : active
                  ? "Active"
                  //* if inactive
                  : inactive
                  ? "Inactive"
                  //* if not started
                  : "Not Started"}
              </span>

              {/*//* Activity message */}
              <p className="text-sm text-muted-foreground">
                {
                  //* if submitted
                  submitted
                  ? `Submitted at ${new Date(staffPanelData.submittedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  //* if active
                  : active
                  ? "Patient is currently filling out the form"
                  //* if inactive
                  : inactive
                  ? "Patient is away"
                  //* if not started
                  : "Waiting for patient to begin"
                }
              </p>
            </div>
          </div>

          {/* //* Completion % Text */}
          <span className="flex flex-col items-center text-lg text-foreground font-bold">
            {staffPanelData.completionPct}%
            <p className="text-sm">Complete</p>
          </span>
        </div>

        {/* //* Progress Bar */}
        <ProgressBar completionPct={staffPanelData.completionPct} />
        {/* //* Last Activity */}
        {!submitted && (active || inactive) && (
          <p className="text-xs text-muted-foreground">
            {`Last Activity: ${activityMessage}`}
          </p>
        )}

        {/* //* Currently Entering Field */}
        {active && <div className={`flex items-center gap-2 text-sm text-accent ${activeField ? "" : "hidden"}`}>
          <Activity className="w-4 h-4"/>
          <p>Entering: <span className="font-bold">
            {activeField?.label}</span>
          </p>
          <TypeAnimation/>
        </div>
        }
      </div>

      {/* //* Info Cards */}
      {sectionArr.map(section => (
        <StaffSectionContainer
          key={section.title}
          icon={section.icon}
          title={section.title}
          fields={section.fields}
          getInfoCardProps={getInfoCardProps}
        />
      ))}

      {/* //* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat)=>(
          <StatCard
            key={stat.id}
            id={stat.id}
            current={stat.current}
            total={stat.total}
            label={stat.label}
            notStarted={notStarted}
          />
        ))}
      </div>
    </div>
  )
}