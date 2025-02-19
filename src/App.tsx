import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TodoApp from "./components/TodoApp/TodoApp";
import WeatherApp from "./components/WeatherApp/WeatherApp";

function App() {
  const [activeApp, setActiveApp] = useState("todo");

  return (
    <div>
      <Navbar activeApp={activeApp} setActiveApp={setActiveApp} />
      <div className="app-content">
        {activeApp === "todo" && <TodoApp />}
        {activeApp === "weather" && <WeatherApp />}
      </div>
    </div>
  );
}

export default App;