"use client";
import { useState, useEffect } from "react";
import {HeartPulse,Sun,Moon} from "lucide-react";

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

  return (
    <main>
      <nav className="bg-primary h-16 w-full py-2 px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center bg-accent w-10 h-10 rounded-lg">
            <HeartPulse className="text-primary-foreground"/>
          </div>
          <div>
            <p className="text-primary-foreground font-bold">Patient Sync</p>
            <p className="text-primary-foreground text-xs">Patient registration system</p>
          </div>
        </div>
        <button onClick={changeTheme} className="bg-accent dark:bg-muted-foreground text-primary-foreground w-20 py-2 px-2
          rounded-lg flex items-center justify-center gap-2 cursor-pointer
          hover:scale-105 active:scale-95 transition-all duration-200 ease">
            {darkMode ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
            <p className="text-sm font-bold">{darkMode ? "Light" : "Dark"}</p>
        </button>
      </nav>
    </main>
  );
}