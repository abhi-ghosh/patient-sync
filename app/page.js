"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";
import StaffPanel from "@/components/StaffPanel";
import PatientPanel from "@/components/PatientPanel";
import {userOptions, defaultPatientState, defaultStaffState, requiredFields} from "@/components/Data";
export default function Home() {

  //PatientPanel data
  const [patientPanelData, setPatientPanelData] = useState(defaultPatientState);

  //StaffPanel data
  const [staffPanelData, setStaffPanelData] = useState(defaultStaffState);


  //PatientPanel mobile sections button state
  const [whichForm, setWhichForm] = useState("patient");

  //Error & Touched States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  //Field Validator
  function validateField(name, value) {
  if (requiredFields.includes(name) && value.trim() === "") {
    return "This field is required";
  }
  if (
    (name === "patientNumber" || name === "emergencyNumber") &&
    value.trim() &&
    !/^[+]?[\d\s\-()]{7,20}$/.test(value)
  ) {
    return "Please enter a valid phone number";
  }
  if (
    name === "email" &&
    value.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    return "Please enter a valid email address";
  }
  if (name === "dob" && value) {
    const today = new Date().toISOString().split("T")[0];

    if (value > today) {
      return "Date of birth cannot be in the future";
    }
  }
    return "";
  }

  //WebSocket connection
  const socket = useRef(null);
  useEffect(() => {
  socket.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080");
  socket.current.onopen = () => {
    console.log("Connected to WebSocket server");
    };

  //Handle incoming messages from the server
  socket.current.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    setStaffPanelData(prev => ({
      ...prev,
      ...payload
    }));
    };

    return () => {
      socket.current.close();
    };
  }, []);

  //Theme toggle state
  const [darkMode, setDarkMode] = useState(false);

  //Theme toggle function
  const changeTheme = () => {
    setDarkMode(prev => !prev);
  }
  //To make sure the theme is set on page load
  useEffect(() => {
    document.documentElement.classList.toggle("dark",darkMode);
  }, [darkMode]);


  //Form completion % calculator
  function calculateCompletion(formData) {
  let completed = 0;
  requiredFields.forEach((field) => {
    if (formData[field].trim() !== "") {
      completed++;
    }
  });
  return Math.round((completed / requiredFields.length) * 100);
  }
  //Updated completion % for the StaffPanel
  const completionPct = calculateCompletion(patientPanelData);

  //PatientPanel input handler
  const formInputHandler = (e) => {
    let { name, value } = e.target;
    //Preventing users from entering Alphabets in the phone number fields
    if (name === "patientNumber" || name === "emergencyNumber") {
      value = value.replace(/[^\d+\-()\s]/g, "");
    }
    const error = validateField(name, value);
    const updatedErrors = { ...errors };
    if (error) {
      updatedErrors[name] = error;
    } else {
      delete updatedErrors[name];
    }
    setErrors(updatedErrors);

    setPatientPanelData(prev => {
      const updatedValue = {
        ...prev,
        [name]: value
      }

      //payload to send to the server (then StaffPanel will receive it)
      const payload = {
        formData: updatedValue,
        status: "active",
        lastActivity: Date.now(),
        activeField: name,
        errors: updatedErrors,
        completionPct: calculateCompletion(updatedValue),
        submittedAt: null,
      };

      //Send the updated form data to the server via WebSocket
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify(payload));
      }

      return updatedValue;
    })
  }

  //Focus Handler for synced form fields when an input is in focus
  const formFocusHandler = (fieldName) => {
        const payload = {
          activeField: fieldName,
          lastActivity: Date.now()
        }
        if (socket.current?.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(payload));
        }
      }

  //Blur Handler for synced form fields when an input is blurred (not in focus)
  const formBlurHandler = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const error = validateField(name, value);
    const updatedErrors = { ...errors };
    if (error) {
      updatedErrors[name] = error;
    } else {
      delete updatedErrors[name];
    }
    setErrors(updatedErrors);
    const payload = {
      activeField: null,
      lastActivity: Date.now(),
      errors: updatedErrors,
    };
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(payload));
    }
  };
  const isFormValid =
    requiredFields.every((field) => patientPanelData[field].trim() !== "") &&
    Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent submitting invalid form
    if (!isFormValid) return;
    setPatientPanelData(prev => ({
      ...prev,
      submitted: true,
    }));
    const payload = {
      submitted: true,
      submittedAt: Date.now(),
      status: "submitted",
      activeField: null,
      completionPct: 100,
    };
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(payload));
    }
  };

  //Submission Reset
  const resetForm = () => {
    setPatientPanelData(defaultPatientState);

    const payload = {
      ...defaultStaffState,
    };

    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(payload));
    }
  };
  return (
    <main className="bg-card min-h-screen">
      <Navbar changeTheme={changeTheme} darkMode={darkMode}/>
      <MainContent whichForm={whichForm} setWhichForm={setWhichForm}>
        <PatientPanel userOptions={userOptions} patientPanelData={patientPanelData}
          formInputHandler={formInputHandler} completionPct={completionPct}
          formFocusHandler={formFocusHandler} formBlurHandler={formBlurHandler} errors={errors}
          touched={touched} handleSubmit={handleSubmit} resetForm={resetForm} isFormValid={isFormValid}/>
        <StaffPanel staffPanelData={staffPanelData}/>
      </MainContent>
    </main>
  );
}