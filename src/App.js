import React from "react";
import { BrowserRouter,  Routes, Route, Link, } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import ListExercise from './components/ListExercises';
import CreateExercise from './components/CreateExercise';
import EditExercise from './components/EditExercises';
import CreateUser from './components/CreateUser';

function App() {
  return (    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListExercise />} />
        <Route path="/edit/:id" element={<EditExercise />} />
        <Route path="/create" element={<CreateExercise />} />
        <Route path="/user" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
