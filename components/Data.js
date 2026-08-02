const userOptions = {
  genders: ["Male", "Female", "Other", "Prefer not to say"],
  languages: ["Thai", "English", "Mandarin", "Lithuanian", "French", "Spanish", "German", "Hindi", "Arabic"],
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
],
  religions: [
    "Buddhism", "Christianity", "Hinduism", "Islam", "Judaism", "Other"
  ]
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
const allFields = [...personalFields, ...contactFields, ...additionalFields, ...emergencyFields];
const requiredFields = ["firstName", "lastName", "dob", "gender", "patientNumber", "address", "language", "nationality", "emergencyNumber"];
export { userOptions, defaultFormData, defaultPatientState, defaultStaffState, personalFields, contactFields, additionalFields, emergencyFields, requiredFields, allFields };
