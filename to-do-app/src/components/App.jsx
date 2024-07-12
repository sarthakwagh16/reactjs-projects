import React from "react";
import { useState } from "react";
import Input from "./Input";
function App() {
  const [inputText, setInput] = useState("");
  const [items, setItem] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInput(newValue);
  }

  function addItem() {
    setItem((prevItem) => {
      return [...prevItem, inputText];
    });

    setInput("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item, index) => {
            return <Input key={index} item={item} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
