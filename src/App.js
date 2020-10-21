import React from 'react';
import './App.css';
import DataFetching from './DataFetching';
import CatalogVodsContainer from './vods/VodsContainer';

function App() {
  return (
    <React.Fragment>
      <DataFetching />
      {/* <CatalogVodsContainer /> */}
    </React.Fragment>
  );
}

export default App;
