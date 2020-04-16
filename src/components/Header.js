import React from "react";
import { useAppState } from "./AppContext";

function Header() {
  let [{ toRead, completed }, dispatch] = useAppState();
  return (
  <header className="App-header">
      Reading Challenge
    <div>
      We have read {completed.length} books, out of {toRead.length}!
    </div>
  </header>
  );
}

export default Header;
