import {describe,it,expect} from 'vitest';
import validateField from './FieldValidator';
import {requiredFields} from '../components/Data';

//* Fields that pass non-empty tests
const nonEmpty = [
      {
      field: "firstName",
      value: "Abhijit"
    },{
      field: "lastName",
      value: "Ghosh"
    },{
      field: "dob",
      value: "2013-01-02"
    },{
      field: "gender",
      value: "male"
    },{
      field: "patientNumber",
      value: "+911234567890"
    },{
      field: "address",
      value: "123 Main St"
    },{
      field: "language",
      value: "English"
    },{
      field: "nationality",
      value: "Thai"
    },{
      field: "emergencyNumber",
      value: "+911234567890"
    }
]
//* Fields that should contain a person's name
const nameFields = {
  firstName: "first name",
  lastName: "last name",
  middleName: "middle name",
  emergencyName: "name",
};

describe("validateField",()=>{

  //* Testing if a required field has been left empty
  it("rejects an empty field", ()=> {
    requiredFields.forEach((field) => {
      expect(validateField(field,"")).toBe("This field is required");
    })
  })

  //* Testing if a non-empty field is accepted
  it("accepts a non-empty field", ()=> {
    nonEmpty.forEach((field)=>{
      expect(validateField(field.field,field.value)).toBe("");
    })
  })


  //* Testing if invalid names are rejected
  it("rejects an invalid name field", ()=>{
    Object.entries(nameFields).forEach(([field,label])=>{
      expect(validateField(field,"A")).toBe(`Please enter a valid ${label}`);
    })
  })

  ///* Testing if valid names with spaces & characters are accepted
  it("accepts names with spaces, hyphens, and apostrophes", ()=>{
    Object.keys(nameFields).forEach((field)=>{
      ["Abhijit Ghosh","Abhijit-Ghosh","Abhijit O'Ghosh"].forEach((name)=>{
        expect(validateField(field,name)).toBe("");
      })
    })
  })

  //* Testing if future DOBs are rejected
  it("rejects a future DOB", ()=>{
    expect(validateField("dob","2045-01-11")).toBe("Date of birth cannot be in the future");
  })

  //* Testing if invalid numbers are rejected
  it("rejects an invalid phone number", ()=>{
    ["patientNumber","emergencyNumber"].forEach((field)=>{
      expect(validateField(field,"1234567890")).toBe("Please enter the country code first");
      ["+9112345","+91-/'","+9112345678901234"].forEach((value)=>{
        expect(validateField(field,value)).toBe("Please enter a valid phone number");
      })
    })
  })

  //*Testing if it accepts valid emails
  it("accepts a valid email",()=>{
    expect(validateField("email","email@domain.com")).toBe("");
  })

  //*Testing if invalid emails are rejected
  it("rejects an invalid email",()=>{
    ["email","email@","email@domain"].forEach((mail)=>{
      expect(validateField("email",mail)).toBe("Please enter a valid email address");
    })
  })

  //*Testing if invalid addresses are rejected
  it("rejects an invalid address",()=>{
    expect(validateField("address","nah"))
    .toBe("Address must be at least 10 characters")
  })
    //*Testing if valid addresses are accepted
  it("accepts a valid address",()=>{
    expect(validateField("address","Khlong San, Bangkok 10600, Thailand"))
    .toBe("")
  })
})