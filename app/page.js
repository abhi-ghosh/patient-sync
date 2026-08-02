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


  //WebSocket connection
  const socket = useRef(null);
  useEffect(() => {
  socket.current = new WebSocket("ws://localhost:8080");
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
    const { name, value } = e.target;
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
        errors: {},
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
  const formBlurHandler = () => {
        const payload = {
          activeField: null
        }
        if (socket.current?.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(payload));
        }
      }

  return (
    <main className="bg-card min-h-screen">
      <Navbar changeTheme={changeTheme} darkMode={darkMode}/>
      <MainContent whichForm={whichForm} setWhichForm={setWhichForm}>
        <PatientPanel userOptions={userOptions} patientPanelData={patientPanelData}
          formInputHandler={formInputHandler} completionPct={completionPct}
          formFocusHandler={formFocusHandler} formBlurHandler={formBlurHandler}/>
        <StaffPanel staffPanelData={staffPanelData}/>
      </MainContent>
    </main>
  );
}