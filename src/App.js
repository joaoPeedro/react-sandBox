import React from "react";
import "./App.css";
import DataFetching from "./DataFetching";
import StartModal from "./starters/StartModal.jsx";
import CatalogVodsContainer from "./vods/VodsContainer";

function App() {
  return (
    <React.Fragment>
      {/* <DataFetching /> */}
      {/* <CatalogVodsContainer /> */}
      <StartModal />
    </React.Fragment>
  );
}

export default App;
