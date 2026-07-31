"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MainContent from "@/components/MainContent";
import StaffPanel from "@/components/StaffPanel";
import PatientPanel from "@/components/PatientPanel";
import userOptions from "@/components/Data";
export default function Home() {

  const [darkMode, setDarkMode] = useState(false);
  //Theme toggle function
  const changeTheme = () => {
    setDarkMode(prev => !prev);
  }
  //To make sure the theme is set on page load
  useEffect(() => {
    document.documentElement.classList.toggle("dark",darkMode);
  }, [darkMode]);

  //Mobie form sections
  const [whichForm, setWhichForm] = useState("patient")

  return (
    <main className="bg-card min-h-screen">
      <Navbar changeTheme={changeTheme} darkMode={darkMode}/>
      <MainContent whichForm={whichForm} setWhichForm={setWhichForm}>
        <PatientPanel userOptions={userOptions}/>
        <StaffPanel/>
      </MainContent>
    </main>
  );
}