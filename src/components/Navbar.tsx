import React from "react";

interface NavbarProps {
  activeApp: string;
  setActiveApp: (app: string) => void;
}

function Navbar({ activeApp, setActiveApp }: NavbarProps) {
  return (
    <nav className="navbar">
      <button
        className={`nav-button ${activeApp === "todo" && "active"}`}
        onClick={() => setActiveApp("todo")}
      >
        To-Do List
      </button>
      <button
        className={`nav-button ${activeApp === "weather" && "active"}`}
        onClick={() => setActiveApp("weather")}
      >
        Weather App
      </button>
    </nav>
  );
}

export default Navbar;