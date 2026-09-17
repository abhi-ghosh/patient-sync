  import { requiredFields } from "@/components/Data";

  //* Field Validator
  export default function validateField(name, value) {

    //* Remove whitespace from the beginning and end of the value
    const trimmedValue = value.trim();

    //* Check if a required field has been left empty
    if (requiredFields.includes(name) && !trimmedValue) {
      return "This field is required";
    }

    //* Fields that should contain a person's name
    const nameFields = [
      "firstName",
      "lastName",
      "middleName",
      "emergencyName",
    ];

    //* Allow letters, spaces, hyphens, and apostrophes in names
    const nameRegex = /^[\p{L}]+(?:[\s'-][\p{L}]+)*$/u;

    //* Validate name length and format when a name has been entered
    if (
      nameFields.includes(name) &&
      trimmedValue &&
      (trimmedValue.length < 2 || !nameRegex.test(trimmedValue))
    ) {
      return "Please enter a valid name";
    }

    //* Fields that should contain an international phone number
    const phoneFields = ["patientNumber", "emergencyNumber"];

    //* Validate international phone numbers
    if (phoneFields.includes(name) && trimmedValue) {
      const normalizedPhone = trimmedValue.replace(/[\s()-]/g, "");

      //* Check that the phone number starts with a country code
      if (!normalizedPhone.startsWith("+")) {
        return "Please enter the country code first";
      }

      //* Check that the remaining phone number contains only valid digits
      if (!/^\+[1-9]\d{7,14}$/.test(normalizedPhone)) {
        return "Please enter a valid phone number";
      }
    }

    //* Validate the email format when an email has been entered
    if (
      name === "email" &&
      trimmedValue &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
    ) {
      return "Please enter a valid email address";
    }

    //* Prevent unrealistically short addresses
    if (name === "address" && trimmedValue.length < 10) {
      return "Address must be at least 10 characters";
    }

    //* Prevent the date of birth from being set in the future
    if (name === "dob" && value) {
      const today = new Date().toISOString().split("T")[0];

      if (value > today) {
        return "Date of birth cannot be in the future";
      }
    }

    //* An empty string means the field passed validation
    return "";
  }
