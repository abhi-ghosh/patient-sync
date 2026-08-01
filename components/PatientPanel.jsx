import { User,Phone, Heart, Globe } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
export default function PatientPanel({userOptions}) {

  //Reusable Input Form Styles
  const inputStyles = "w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring";
  const sectionStyle = "flex flex-col gap-6";

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="text-foreground flex gap-1 flex-col">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <div className="bg-secondary p-2 rounded-lg items-center justify-center border border-accent">
            <User className="text-accent w-4 h-4" />
          </div>
          Patient Registration
        </h1>
        <p className="text-sm text-muted-foreground">Fields marked <span className="text-red-500">*</span> are required</p>
      </div>

      {/* Progress Bar */}
      <div className="z-10 sticky top-5 lg:top-[-32] bg-card flex flex-col gap-3 rounded-lg border border-border p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-md text-muted-foreground">
            Form completion
          </span>
          <span className="text-lg text-foreground font-bold">
            {0}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-muted">
          <div className="h-full w-0 rounded-full bg-accent" />
        </div>
        <p className="text-md text-muted-foreground">
          0 of 8 required fields complete
        </p>
      </div>

      {/* Personal Information */}
      <section className={sectionStyle}>
        <SectionHeader icon={User} title="Personal Information" />
        {/* First & Middle Name */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="firstName" className="font-semibold text-foreground">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="e.g. Abhijit"
              className={inputStyles} spellCheck={false}
              required
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="middleName" className="font-semibold text-foreground">
              Middle Name
            </label>
            <input
              id="middleName"
              type="text"
              name="middleName"
              placeholder="Optional"
              className={inputStyles} spellCheck={false}
            />
          </div>
        </div>
        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="font-semibold text-foreground">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="e.g. Ghosh"
            className={inputStyles} spellCheck={false}
            required
          />
        </div>
        {/* DOB & Gender */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="dob" className="font-semibold text-foreground">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              id="dob"
              type="date"
              name="dob"
              className={inputStyles}
              required
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="gender" className="font-semibold text-foreground">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              className={inputStyles}
              required
            >
              <option value="">Select...</option>
              {userOptions.genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className={sectionStyle}>
        <SectionHeader icon={Phone} title="Contact Information" />
        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="patientNumber" className="font-semibold text-foreground">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="patientNumber"
            type="tel"
            name="phoneNumber"
            placeholder="e.g. +66 00 000 0000"
            className={inputStyles} spellCheck={false}
            required
          />
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-foreground">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="e.g. name@example.com"
            className={inputStyles} spellCheck={false}
          />
        </div>
        {/* Address */}
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="font-semibold text-foreground">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            rows="4"
            placeholder="Street address, city, state, ZIP code"
            className={inputStyles} spellCheck={false}
            required
          />
        </div>
      </section>

      {/* Additional Information */}
      <section className={sectionStyle}>
        <SectionHeader icon={Globe} title="Additional Information" />
        {/* Preferred Language & Nationality */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="language" className="font-semibold text-foreground">
              Preferred Language <span className="text-red-500">*</span>
            </label>
            <select
              id="language"
              name="preferredLanguage"
              className={inputStyles}
              required
            >
              <option value="">Select...</option>
              {userOptions.languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="nationality" className="font-semibold text-foreground">
              Nationality <span className="text-red-500">*</span>
            </label>
            <select
              id="nationality"
              name="nationality"
              className={inputStyles}
              required
            >
              <option value="">Select...</option>
              {userOptions.nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Religion */}
        <div className="flex flex-col gap-2">
          <label htmlFor="religion" className="font-semibold text-foreground">
            Religion
          </label>
          <select
            id="religion"
            name="religion"
            className={inputStyles}
          >
            <option value="">Select...</option>
            {userOptions.religions.map((religion) => (
              <option key={religion} value={religion}>
                {religion}
              </option>
            ))}
          </select>
        </div>
      </section>
      {/* Emergency Contact */}
      <section className={sectionStyle}>
        <SectionHeader icon={Heart} title="Emergency Contact" />
        {/* Emergency Contact Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="emergencyNumber" className="font-semibold text-foreground">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            id="emergencyNumber"
            type="tel"
            name="emergencyContactNumber"
            placeholder="e.g. +66 11 222 3333"
            className={inputStyles} spellCheck={false}
            required
          />
        </div>
        {/* Contact Name & Relationship */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="emergencyName" className="font-semibold text-foreground">
              Contact Name
            </label>
            <input
              id="emergencyName"
              type="text"
              name="emergencyContactName"
              placeholder="e.g. Jill Valentine"
              className={inputStyles} spellCheck={false}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="emergencyRelationship" className="font-semibold text-foreground">
              Relationship
            </label>
            <input
              id="emergencyRelationship"
              type="text"
              name="emergencyRelationship"
              placeholder="e.g. Parent"
              className={inputStyles}
            />
          </div>
        </div>
      </section>

      {/* Submit Button and Terms */}
      <div className="border-t border-border pt-6">
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-primary-foreground
          transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          Register Patient
        </button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          By submitting, you confirm that all information provided is accurate
          and complete.
        </p>
      </div>

    </div>
  )
}