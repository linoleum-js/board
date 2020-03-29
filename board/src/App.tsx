import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Board } from '@components/Board/Board';

function App() {
  return (
    <Router>
      <Route component={Board} path="/:id?" />
    </Router>
  );
}

export default App;
