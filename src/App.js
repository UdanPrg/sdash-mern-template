import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap';

import Navbar from './components/Navbar';
import ListExercise from './components/ListExercises';
import CreateExercise from './components/CreateExercise';
import EditExercise from './components/EditExercises';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" componen={ListExercise} />
      <Route path="/edit/:id" componen={EditExercise} />
      <Route path="/create" componen={CreateExercise} />
      <Route path="/user" componen={CreateUser} />
    </Router>
  );
}

export default App;
