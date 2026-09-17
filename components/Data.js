const userOptions = {
  genders: ["Male", "Female", "Other", "Prefer not to say"].map(x=>x.toUpperCase()),
  languages: ["Thai", "English", "Mandarin", "Lithuanian", "French", "Spanish", "German", "Hindi", "Arabic"].map(x=>x.toUpperCase()),
  nationalities: ["Afghan", "Albanian", "Algerian", "Andorran", "Angolan",
  "Antiguan or Barbudan", "Argentine", "Armenian", "Australian", "Austrian",
  "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian",
  "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese",
  "Bolivian", "Bosnian or Herzegovinian", "Botswanan", "Brazilian", "Bruneian",
  "Bulgarian", "Burkinabé", "Burundian", "Cabo Verdean", "Cambodian",
  "Cameroonian", "Canadian", "Central African", "Chadian", "Chilean",
  "Chinese", "Colombian", "Comoran", "Congolese (Republic of the Congo)", "Costa Rican",
  "Croatian", "Cuban", "Cypriot", "Czech", "Congolese (DR Congo)",
  "Danish", "Djoutian", "Dominican (Dominican Republic)", "Dominican (Dominica)", "Ecuadorian",
  "Egyptian", "Salvadoran", "Equatoguinean", "Eritrean", "Estonian",
  "Swazi", "Ethiopian", "Fijian", "Finnish", "French",
  "Gabonese", "Gambian", "Georgian", "German", "Ghanaian",
  "Greek", "Grenadian", "Guatemalan", "Guinean", "Bissau-Guinean",
  "Guyanese", "Haitian", "Honduran", "Hungarian", "Icelandic",
  "Indian", "Indonesian", "Iranian", "Iraqi", "Irish",
  "Israeli", "Italian", "Jamaican", "Japanese", "Jordanian",
  "Kazakhstani", "Kenyan", "I-Kiribati", "Kuwaiti", "Kyrgyzstani",
  "Laotian", "Latvian", "Lebanese", "Lesotho", "Liberian",
  "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourger", "Malagasy",
  "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese",
  "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian",
  "Moldovan", "Monegasque", "Mongolian", "Montenegrin", "Moroccan",
  "Mozambican", "Burmese", "Namibian", "Nauruan", "Nepali",
  "Dutch", "New Zealander", "Nicaraguan", "Nigerien", "Nigerian",
  "North Korean", "Macedonian", "Norwegian", "Omani", "Pakistani",
  "Palauan", "Palestinian", "Panamanian", "Papua New Guinean", "Paraguayan",
  "Peruvian", "Filipino", "Polish", "Portuguese", "Qatari",
  "Romanian", "Russian", "Rwandan", "Kittitian or Nevisian", "Saint Lucian",
  "Vincentian", "Samoan", "Sammarinese", "Sao Tomean", "Saudi",
  "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean",
  "Slovak", "Slovenian", "Solomon Islander", "Somali", "South African",
  "South Korean", "South Sudanese", "Spanish", "Sri Lankan", "Sudanese",
  "Surinamese", "Swedish", "Swiss", "Syrian", "Taiwanese",
  "Tajik", "Tanzanian", "Thai", "Timorese", "Togolese",
  "Tongan", "Trinidadian or Tobagonian", "Tunisian", "Turkish", "Turkmen",
  "Tuvaluan", "Ugandan", "Ukrainian", "Emirati", "British",
  "American", "Uruguayan", "Uzbek", "Ni-Vanuatu", "Vatican",
  "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean"
].map(x=>x.toUpperCase()),
  religions: [
    "Buddhism", "Christianity", "Hinduism", "Islam", "Judaism", "Other"
  ].map(x=>x.toUpperCase())
};

const defaultFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  gender: "",
  patientNumber: "",
  email: "",
  address: "",
  language: "",
  nationality: "",
  religion: "",
  emergencyNumber: "",
  emergencyName: "",
  emergencyRelationship: "",
};

const defaultPatientState = {
  ...defaultFormData,
  submitted: false,
};

const defaultStaffState = {
  formData: defaultFormData,
  status: "inactive",
  lastActivity: null,
  activeField: null,
  errors: {},
  completionPct: 0,
  submitted: false,
  submittedAt: null,
};

const personalFields = [
  {key: "firstName", label: "FIRST NAME"},
  {key: "middleName", label: "MIDDLE NAME"},
  {key: "lastName", label: "LAST NAME"},
  {key: "dob", label: "DATE OF BIRTH"},
  {key: "gender", label: "GENDER"}
];

const contactFields = [
  {key: "patientNumber", label: "PATIENT NUMBER"},
  {key: "email", label: "EMAIL ADDRESS"},
  {key: "address", label: "ADDRESS"},
];

const additionalFields = [
  {key: "language", label: "PREFERRED LANGUAGE"},
  {key: "nationality", label: "NATIONALITY"},
  {key: "religion", label: "RELIGION"},
];

const emergencyFields = [
  {key: "emergencyNumber", label: "EMERGENCY CONTACT NUMBER"},
  {key: "emergencyName", label: "EMERGENCY CONTACT NAME"},
  {key: "emergencyRelationship", label: "EMERGENCY CONTACT RELATIONSHIP"},
];

const input = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    placeholder: "e.g. Abhijit",
    spellCheck: false,
  },
  {
    name: "middleName",
    label: "Middle Name",
    type: "text",
    required: false,
    placeholder: "Optional",
    spellCheck: false,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "e.g. Ghosh",
    spellCheck: false,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: "genders",
  },

  {
    name: "patientNumber",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "e.g. +66 00 000 0000",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: false,
    placeholder: "e.g. name@example.com",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    required: true,
    placeholder: "Street address, city, state, ZIP code",
    rows: 4,
  },

  {
    name: "language",
    label: "Preferred Language",
    type: "select",
    required: true,
    options: "languages",
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "select",
    required: true,
    options: "nationalities",
  },
  {
    name: "religion",
    label: "Religion",
    type: "select",
    required: false,
    options: "religions",
  },

  {
    name: "emergencyName",
    label: "Contact Name",
    type: "text",
    required: false,
    placeholder: "e.g. Jill Valentine",
  },
  {
    name: "emergencyRelationship",
    label: "Relationship",
    type: "text",
    required: false,
    placeholder: "e.g. Parent",
  },

  {
    name: "emergencyNumber",
    label: "Contact Number",
    type: "tel",
    required: true,
    placeholder: "e.g. +66 11 222 3333",
  }
];

const allFields = [...personalFields, ...contactFields, ...additionalFields, ...emergencyFields];

const requiredFields = ["firstName", "lastName", "dob", "gender", "patientNumber", "address", "language", "nationality", "emergencyNumber"];

export { userOptions, defaultFormData, defaultPatientState, defaultStaffState, personalFields, contactFields, additionalFields, emergencyFields, requiredFields, allFields, input };
