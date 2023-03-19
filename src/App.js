import React from "react";
import { BrowserRouter,  Routes, Route, Link, } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import ListExercise from './components/ListExercises';
import CreateExercise from './components/CreateExercise';
import EditExercises from './components/EditExercises';
import CreateUser from './components/CreateUser';

function App() {
  return (    
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid main-content">
        <div className="row">
          <Routes>
            <Route path="/" element={<ListExercise />} />
            <Route path="/edit/:id" element={<EditExercises />} />
            <Route path="/create" element={<CreateExercise />} />
            <Route path="/user" element={<CreateUser />} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
