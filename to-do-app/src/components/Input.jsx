import React from "react";
import { useState } from "react";
import "./Input.css";
function Input(props) {
  const [isDone, setIsDone] = useState(false);

  function isCompleted() {
    setIsDone((prevValue) => {
      return !prevValue;
    });
  }

  return (
    <div style={{ display: "flex" }}>
      <li
        style={{
          textDecoration: isDone ? "line-through" : "none",
        }}
      >
        {props.item}
      </li>
      <button id="isDone" onClick={isCompleted}>
        {isDone ? "Undo" : "Done"}
      </button>
    </div>
  );
}

export default Input;
