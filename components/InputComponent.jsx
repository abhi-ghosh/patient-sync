import {Check} from "lucide-react";
export default function InputComponent({userOptions, patientPanelData, label, name, type, required, rows,
  formInputHandler, placeholder, formFocusHandler, formBlurHandler, errors, touched, spellcheck=true, options}) {

  //* Reusable Input Form Styles
  const inputStyles = "w-full rounded-lg border border-border bg-card px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2";

  //* Reusable Input Field Styles with conditional styles
  const getInputStyles = (field) => {
    if (errors[field] && touched[field]) {
      return `${inputStyles} border-red-500 focus:ring-red-500`;
    }
    if (
      touched[field] &&
      patientPanelData[field].trim() &&
      !errors[field]
    ) {
      return `${inputStyles} border-green-500 focus:ring-green-500`;
    }
    return `${inputStyles} border-border focus:ring-ring`;
  };

  //* Today's Date
  const today = new Date().toISOString().split("T")[0];

  //* Input props
  const inputProps= {
    id: name,
    type: type,
    name: name,
    value: patientPanelData[name],
    inputMode: name === "patientNumber" || name === "emergencyNumber" ? "numeric" : null,
    max: name === "dob" ? today : "",
    onChange: formInputHandler,
    placeholder: placeholder,
    className: getInputStyles(name),
    spellCheck: spellcheck,
    rows: rows,
    required: required,
    onFocus: () => formFocusHandler(name),
    onBlur: (e) => formBlurHandler(e)
  }

  //* Select JSX (using a conditional here because otherwise it will try to map over undefined when options does not exist)
  const select =
    type === "select"
      ? (
          <select {...inputProps}>
            <option className="text-muted-foreground" value="" disabled>Select {label}</option>
            {userOptions[options].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
      )
  : null;

  //* Special class
  const specialClass = [
      "lastName",
      "patientNumber",
      "email",
      "address",
      "religion",
      "emergencyRelationship",
    ].includes(name)
      ? "md:col-span-2"
      : "";

  return (
        <div className={`relative ${specialClass}`}>
          <label htmlFor={name} className="font-semibold absolute left-3 top-[-7] bg-card text-xs text-foreground bg:d  px-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
            {type === "select"
              ? select
              : type === "textarea"
              ? <textarea {...inputProps}/>
              : <input {...inputProps}/>
            }

          {/*//* If an input has been touched and there is an error, show an error message */}
          {/*//* If no error, show a checkmark */}
          {touched[name] &&
            <p className={`text-xs px-4 py-0.5 rounded-sm absolute right-0 top-[-9] border dark:bg-card
                ${errors[name] ? `bg-red-100 border-red-500 text-red-500`
                  //* If no value, hide the checkmark (this is for optional values mainly, works for all though)
                  :`bg-green-100 border-green-500 text-green-500 ${!patientPanelData[name].trim() && "hidden"}`}`}
            >
              { //* If there is an error, show the error message
              errors[name] ? errors[name]
              //* If no error & there is a value in the input box, show a checkmark
              : patientPanelData[name].trim() && <Check className="w-4 h-4"/>}
            </p>
          }
        </div>
  );
}