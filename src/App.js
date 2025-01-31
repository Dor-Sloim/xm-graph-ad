import React from "react";
import CyberGraph from "./CyberGraph";
import generateMockData from "./mockData";
import "./App.css";

function App() {
  const data = generateMockData();

  return (
    <div className="App">
      <h1>Dopo Graph </h1>
      <div className="graph-container">
        <CyberGraph data={data} />
      </div>
    </div>
  );
}

export default App;
