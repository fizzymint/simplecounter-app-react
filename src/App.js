import React from 'react';

import classes from  './App.module.css';
import Layout from './Components/Layout/Layout';

function App() {
  return (
    <div className={classes.App}>
      <h1>Simple Counter App</h1>
      <Layout />
    </div>
  );
}

export default App;
