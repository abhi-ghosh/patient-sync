import { User,Phone, Heart, Globe } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import SubmissionSuccess from "@/components/SubmissionSuccess";
import ProgressBar from "@/components/ProgressBar";
import PatientInputSection from "@/components/PatientInputSection";
import InputComponent from "@/components/InputComponent";
import {input} from "@/components/Data";
import PanelHeader from "@/components/PanelHeader";
export default function PatientPanel({userOptions, patientPanelData, formInputHandler, doneReqFields, totalReqFields,
  completionPct, formFocusHandler, formBlurHandler, errors, touched, handleSubmit, resetForm, isFormValid}) {

  //* Submission Success Screen
  if (patientPanelData.submitted) {
    return <SubmissionSuccess resetForm={resetForm} />
  }

  //* Input sections array
  const inputSection = [
    {
      key: "personal",
      title: "Personal Information",
      icon: User,
      inputs: ["firstName", "middleName", "lastName", "dob", "gender"],
    },
    {
      key: "contact",
      title: "Contact Information",
      icon: Phone,
      inputs: ["patientNumber", "email", "address"],
    },
    {
      key: "additional",
      title: "Additional Information",
      icon: Globe,
      inputs: ["language", "nationality", "religion"],
    },
    {
      key: "emergency",
      title: "Emergency Contact",
      icon: Heart,
      inputs: [
        "emergencyNumber",
        "emergencyName",
        "emergencyRelationship",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/*//* Header */}
      <PanelHeader icon={User} title="Patient Registration"
          tag={
            <>
              Fields with <span className="text-red-500">*</span> are required
            </>
          }
      />

      {/*//* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
         {/*//* Progress Bar */}
        <div className="z-10 sticky top-5 lg:-top-8 bg-card flex flex-col gap-3 rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-md text-muted-foreground">
              Form completion
            </span>
            <span className="text-lg text-foreground font-bold">
              {completionPct}%
            </span>
          </div>
          <ProgressBar completionPct = {completionPct} />
          {/*//* Required Fields */}
          <p className="text-md text-muted-foreground">
            {doneReqFields} of {totalReqFields} required fields complete
          </p>
        </div>

      {inputSection.map((section) => (
        <PatientInputSection key={section.key} icon={section.icon} title={section.title}>
          {input.map((i)=>{
            if(section.inputs.includes(i.name)){
              return (
              <InputComponent
                key={i.name}
                name= {i.name}
                label={i.label}
                type={i.type}
                rows={i.rows}
                required={i.required}
                placeholder={i.placeholder}
                spellcheck={i.spellCheck}
                options={i.options}
                userOptions={userOptions}
                patientPanelData={patientPanelData}
                formInputHandler={formInputHandler}
                formFocusHandler={formFocusHandler}
                formBlurHandler={formBlurHandler}
                errors={errors}
                touched={touched}
              />
            )
            }
          })}
        </PatientInputSection>
      ))}

        {/*//* Submit Button and Terms */}
        <div className=" pt-6">
          <button
            type="submit"
            className={`w-full rounded-xl py-4 text-lg font-bold transition-all duration-200
              ${
                isFormValid
                  ? "cursor-pointer bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.98]"
                  : "cursor-not-allowed bg-muted text-muted-foreground opacity-60"
              }`}
            disabled={!isFormValid}
          >
            Register Patient
          </button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            By submitting, you confirm that all information provided is accurate
            and complete.
          </p>
        </div>
      </form>
    </div>
  )
}