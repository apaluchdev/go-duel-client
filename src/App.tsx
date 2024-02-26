import "./App.css";
import Welcome from "./components/game/Welcome";
import React, { useState, useEffect } from "react";
import { FetchUserIdCookie, GetCookie } from "./helper/cookie-helper";
import Game from "./components/game/Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">{GetCurrentView()}</header>
    </div>
  );
}

function GetCurrentView() {
  const [cookie, setCookie] = useState<string>(GetCookie("userId") ?? "");

  // Wait for the user to get a userId cookie
  if (!cookie) {
    console.log("Need to get a cookie first!");
    return <Welcome setCookie={setCookie} />;
  }

  return <Game />;
}

export default App;
