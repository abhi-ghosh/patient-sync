"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";
import StaffPanel from "@/components/StaffPanel";
import PatientPanel from "@/components/PatientPanel";
import ConnectionModal from "@/components/ConnectionModal";
import validateField from "@/components/FieldValidator";
import {userOptions, defaultPatientState, defaultStaffState, requiredFields} from "@/components/Data";
export default function Home() {
  //* PatientPanel data
  const [patientPanelData, setPatientPanelData] = useState(defaultPatientState);

  //* StaffPanel data
  const [staffPanelData, setStaffPanelData] = useState(defaultStaffState);


  //* PatientPanel mobile sections button state
  const [whichForm, setWhichForm] = useState("patient");

  //* Error & Touched States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  //* WebSocket connection UI feedback state
  const [isConnected, setIsConnected] = useState(false);

  //* Socket second timer state
  const [seconds, setSeconds] = useState(0);

  //* WebSocket connection
  const socket = useRef(null);
  useEffect(() => {
  socket.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080");
  //* Time elapsed before the socket connection is considered successful
  const timer = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);
  socket.current.onopen = () => {
    console.log("Connected to WebSocket server");
    setIsConnected(true);
    clearInterval(timer);
    setSeconds(0);
    };

  //* Handle incoming messages from the server
  socket.current.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    setStaffPanelData(prev => ({
      ...prev,
      ...payload
    }));
    };

    return () => {
      socket.current.close();
      clearInterval(timer);
    };
  }, []);

  //* Theme toggle state
  const [darkMode, setDarkMode] = useState(false);

  //* Theme toggle function
  const changeTheme = () => {
    setDarkMode(prev => !prev);
  }
  //* To make sure the theme is set on page load
  useEffect(() => {
    document.documentElement.classList.toggle("dark",darkMode);
  }, [darkMode]);


  //* Form completion % calculator
  function calculateCompletion(formData, formErrors) {
  let completed = 0;
  requiredFields.forEach((field) => {
    if (formData[field].trim() !== "" && !formErrors[field]) {
      completed++;
    }
  });
  return Math.round((completed / requiredFields.length) * 100);
  }

  //* Updated completion % for the PatientPanel
  const completionPct = calculateCompletion(patientPanelData, errors);

  //* PatientPanel input handler
  const formInputHandler = (e) => {
    let { name, value } = e.target;
    //* Preventing users from entering Alphabets in the phone number fields
    if (name === "patientNumber" || name === "emergencyNumber") {
      value = value.replace(/[^\d+\-()]/g, "");
    }
    if (name === "firstName" || name === "middleName" || name === "lastName" ||
        name === "emergencyName" || name === "emergencyRelationship")
      {
        value = value.replace(/[^a-zA-Z\s]/g, "");
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

      //* payload to send to the server (then StaffPanel will receive it)
      const payload = {
        formData: updatedValue,
        lastActivity: Date.now(),
        activeField: name,
        errors: updatedErrors,
        completionPct: calculateCompletion(updatedValue, updatedErrors),
        submittedAt: null,
      };

      //* Send the updated form data to the server via WebSocket
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify(payload));
      }

      return updatedValue;
    })
  }

  //* Preventing the page from scrolling when the modal is open
  useEffect(() => {
  if (!isConnected) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isConnected]);

  //* Focus Handler for synced form fields when an input is in focus
  const formFocusHandler = (fieldName) => {
        const payload = {
          activeField: fieldName,
          lastActivity: Date.now()
        }
        if (socket.current?.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(payload));
        }
      }

  //* Blur Handler for synced form fields when an input is blurred (not in focus)
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

  //* Form Validation Check
  const isFormValid =
    requiredFields.every((field) => patientPanelData[field].trim() !== "") &&
    Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    //* Prevent submitting invalid form
    if (!isFormValid) return;
    setPatientPanelData(prev => ({
      ...prev,
      submitted: true,
    }));
    const payload = {
      submitted: true,
      submittedAt: Date.now(),
      activeField: null,
      completionPct: 100,
    };
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(payload));
    }
  };

  //* Submission Reset
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
    <main className="bg-card min-h-screen relative">
      {!isConnected && <ConnectionModal seconds={seconds}/>}
        <Navbar changeTheme={changeTheme} darkMode={darkMode}/>
        <MainContent whichForm={whichForm} setWhichForm={setWhichForm}>
          <PatientPanel userOptions={userOptions} patientPanelData={patientPanelData}
            formInputHandler={formInputHandler} completionPct={completionPct}
            formFocusHandler={formFocusHandler} formBlurHandler={formBlurHandler} errors={errors}
            touched={touched} handleSubmit={handleSubmit} resetForm={resetForm} isFormValid={isFormValid}
            doneReqFields={requiredFields.filter(field => patientPanelData[field].trim() !== "" && !errors[field]).length}
            totalReqFields={requiredFields.length}
          />
          <StaffPanel staffPanelData={staffPanelData}/>
        </MainContent>
    </main>
  );
}